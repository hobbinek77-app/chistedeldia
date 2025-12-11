import * as Notifications from 'expo-notifications';
import { useState } from 'react';
import { Alert, Platform, Pressable, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { getRandomJoke } from '@/constants/jokes';
import { NOTIFICATION_CHANNEL_ID, ensureAndroidChannel } from '@/constants/notifications';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { exploreStyles as styles } from '@/styles/screens';

export default function ExploreScreen() {
  const [isSending, setIsSending] = useState(false);
  const colorScheme = useColorScheme();
  const primaryColor =
    colorScheme === 'dark' ? '#2563eb' : Colors.light.tint;

  const handleSend = async () => {
    setIsSending(true);
    const joke = getRandomJoke();

    try {
      await ensureAndroidChannel();
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Chiste de prueba',
          body: joke,
          data: { tag: 'manual-joke' },
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
          ...(Platform.OS === 'android' ? { channelId: NOTIFICATION_CHANNEL_ID } : {}),
        },
        trigger: { seconds: 1 },
      });
      Alert.alert('Notificación enviada', 'Llega en unos segundos con un chiste aleatorio.');
    } catch (error) {
      console.error('Error sending test notification', error);
      Alert.alert('No se pudo enviar', 'Revisa permisos o intenta de nuevo.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: 'transparent', dark: 'transparent' }}
      headerHeight={80}
      headerImage={
        <View style={{ flex: 1 }}>
          <IconSymbol
            size={260}
            color="#808080"
            name="bell.fill"
            style={styles.headerImage}
          />
        </View>
      }>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Prueba de notificación</ThemedText>
        <ThemedText>
          Pulsa el botón y enviaremos una notificación inmediata con un chiste aleatorio (como si
          fuera la hora programada).
        </ThemedText>
        <Pressable
          style={[
            styles.button,
            { backgroundColor: primaryColor },
            isSending && styles.buttonDisabled,
          ]}
          disabled={isSending}
          onPress={handleSend}
          accessibilityRole="button">
          <ThemedText style={styles.buttonText}>
            {isSending ? 'Enviando...' : 'Enviar notificación de prueba'}
          </ThemedText>
        </Pressable>
      </ThemedView>
    </ParallaxScrollView>
  );
}

// estilos en styles/screens.ts
