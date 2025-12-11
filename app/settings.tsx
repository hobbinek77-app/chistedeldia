import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import { useEffect, useMemo, useState } from 'react';
import { Alert, Platform, Pressable, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { getJokesSequence } from '@/constants/jokes';
import { NOTIFICATION_CHANNEL_ID, ensureAndroidChannel } from '@/constants/notifications';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { settingsStyles as styles } from '@/styles/screens';

const DAILY_TAG = 'daily-joke';
const DAYS_SCHEDULED_AHEAD = 30;

const createDateAtTime = (hour: number, minute: number) => {
  const date = new Date();
  date.setHours(hour, minute, 0, 0);
  return date;
};

const formatTime = (date: Date) =>
  date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });

async function ensureNotificationPermissions(
  setStatus?: (status: Notifications.PermissionStatus) => void,
) {
  const current = await Notifications.getPermissionsAsync();
  setStatus?.(current.status);
  if (current.status === Notifications.PermissionStatus.GRANTED) {
    return true;
  }

  const request = await Notifications.requestPermissionsAsync();
  setStatus?.(request.status);
  return request.status === Notifications.PermissionStatus.GRANTED;
}

async function cancelScheduledJokes() {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  const targeted = scheduled.filter((item) => item.content?.data?.tag === DAILY_TAG);

  await Promise.all(
    targeted.map((item) => Notifications.cancelScheduledNotificationAsync(item.identifier)),
  );
}

async function scheduleDailyJokes(selectedTime: Date) {
  const hour = selectedTime.getHours();
  const minute = selectedTime.getMinutes();

  await cancelScheduledJokes();

  const jokesSequence = getJokesSequence(DAYS_SCHEDULED_AHEAD);

  const now = new Date();
  const firstTrigger = createDateAtTime(hour, minute);
  if (firstTrigger <= now) {
    firstTrigger.setDate(firstTrigger.getDate() + 1);
  }

  const jobs: Promise<string>[] = [];
  for (let day = 0; day < DAYS_SCHEDULED_AHEAD; day += 1) {
    const triggerDate = new Date(firstTrigger);
    triggerDate.setDate(firstTrigger.getDate() + day);

    jobs.push(
      Notifications.scheduleNotificationAsync({
        content: {
          title: 'Chiste del dia',
          body: jokesSequence[day],
          data: { tag: DAILY_TAG, hour, minute },
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
          ...(Platform.OS === 'android' ? { channelId: NOTIFICATION_CHANNEL_ID } : {}),
        },
        trigger: { type: 'date', date: triggerDate },
      }),
    );
  }

  await Promise.all(jobs);
}

async function getExistingScheduledTime() {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  const existing = scheduled.find((item) => item.content?.data?.tag === DAILY_TAG);

  if (!existing) return null;

  const { hour, minute } = (existing.content?.data ?? {}) as { hour?: number; minute?: number };
  if (
    typeof hour === 'number' &&
    !Number.isNaN(hour) &&
    typeof minute === 'number' &&
    !Number.isNaN(minute)
  ) {
    return { hour, minute };
  }

  return null;
}

export default function SettingsScreen() {
  const [selectedTime, setSelectedTime] = useState<Date>(() => createDateAtTime(9, 0));
  const [showPicker, setShowPicker] = useState(Platform.OS === 'ios');
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] =
    useState<Notifications.PermissionStatus | null>(null);
  const colorScheme = useColorScheme();
  const primaryColor = colorScheme === 'dark' ? '#2563eb' : Colors.light.tint;

  useEffect(() => {
    let active = true;

    (async () => {
      const existingTime = await getExistingScheduledTime();
      const currentPermissions = await Notifications.getPermissionsAsync();
      if (!active) return;

      setPermissionStatus(currentPermissions.status);

      if (existingTime) {
        const restoredDate = createDateAtTime(existingTime.hour, existingTime.minute);
        setSelectedTime(restoredDate);

        if (currentPermissions.status === Notifications.PermissionStatus.GRANTED) {
          try {
            await ensureAndroidChannel();
            await scheduleDailyJokes(restoredDate);
            if (active) {
              setFeedback(`Te enviaremos un chiste diario a las ${formatTime(restoredDate)}h.`);
            }
          } catch (error) {
            console.error('Error refreshing notifications', error);
          }
        }
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const displayTime = useMemo(() => formatTime(selectedTime), [selectedTime]);

  const handleTimeChange = (event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    if (event.type === 'dismissed' || !date) return;
    setSelectedTime(date);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setFeedback(null);
    try {
      const granted = await ensureNotificationPermissions(setPermissionStatus);
      if (!granted) {
        Alert.alert('Activa las notificaciones', 'Necesitamos permiso del sistema para avisarte cada día.');
        return;
      }

      await ensureAndroidChannel();
      await scheduleDailyJokes(selectedTime);
      setFeedback(
        `Listo: te enviamos un chiste al día a las ${displayTime}.`,
      );
    } catch (error) {
      console.error('Error scheduling notification', error);
      Alert.alert('No pudimos programar', 'Revisa los permisos o intenta de nuevo en unos segundos.');
    } finally {
      setIsSaving(false);
    }
  };

  const permissionNote =
    permissionStatus === Notifications.PermissionStatus.DENIED
      ? 'Las notificaciones están desactivadas en el sistema.'
      : null;

    return (
      <ParallaxScrollView
        headerBackgroundColor={{ light: 'transparent', dark: 'transparent' }}
      headerHeight={80}
      headerImage={
        <View style={{ flex: 1 }}>
          <IconSymbol
            size={280}
            color="#0a7ea4"
            name="bell.badge.fill"
            style={styles.headerImage}
          />
        </View>
      }>
      <ThemedView style={styles.section}>
        <ThemedText type="title">Ajustes</ThemedText>
        <ThemedText>
          Elige una hora y te enviaremos "el chiste del día" en tu móvil como una notificación. Usamos una colección local,
          así que no necesitas internet para recibirlos.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.card}>
        <ThemedText type="subtitle">Hora del recordatorio</ThemedText>
        <ThemedText style={styles.timeHint}>
          Toca para cambiar la hora y luego pulsa el botón de "Guardar"
        </ThemedText>
        <Pressable
          style={styles.timeButton}
          onPress={() => setShowPicker(true)}
          accessibilityRole="button">
          <ThemedText style={styles.timeText}>{displayTime}</ThemedText>
        </Pressable>


        
{showPicker && (
          <View style={styles.pickerWrapper}>
            <DateTimePicker
              value={selectedTime}
              mode="time"
              is24Hour
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleTimeChange}
              minuteInterval={1}
            />
          </View>
        )}
      </ThemedView>

      <ThemedView style={styles.card}>
        <Pressable
          style={[styles.ctaButton, { backgroundColor: primaryColor }, isSaving && styles.ctaDisabled]}
          onPress={handleSave}
          disabled={isSaving}
          accessibilityRole="button">
          <ThemedText style={styles.ctaText}>{isSaving ? 'Guardando...' : 'Guardar y programar'}</ThemedText>
        </Pressable>
        {feedback ? <ThemedText style={styles.successText}>{feedback}</ThemedText> : null}
        {permissionNote ? <ThemedText style={styles.warningText}>{permissionNote}</ThemedText> : null}
      </ThemedView>
    </ParallaxScrollView>
  );
}
