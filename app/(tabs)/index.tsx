import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { getRandomJoke } from '@/constants/jokes';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { homeStyles as styles } from '@/styles/screens';

export default function HomeScreen() {
  const [joke, setJoke] = useState<string>(getRandomJoke());
  const [fromNotification, setFromNotification] = useState(false);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const primaryColor = colorScheme === 'dark' ? '#2563eb' : Colors.light.tint;

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const lastResponse = await Notifications.getLastNotificationResponseAsync();
      const body = lastResponse?.notification?.request?.content?.body;
      if (isMounted && body) {
        setJoke(String(body));
        setFromNotification(true);
      }
    })();

    const sub = Notifications.addNotificationResponseReceivedListener((response) => {
      const body = response.notification?.request?.content?.body;
      if (body) {
        setJoke(String(body));
        setFromNotification(true);
      }
    });

    return () => {
      isMounted = false;
      sub.remove();
    };
  }, []);

  const headerText = useMemo(
    () => (fromNotification ? 'Chiste que acabas de abrir' : 'Chiste del día'),
    [fromNotification],
  );

  const handleNewJoke = () => {
    setFromNotification(false);
    setJoke(getRandomJoke(joke));
  };

  return (
    <View style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: 'transparent', dark: 'transparent' }}
        headerHeight={80}
        headerImage={
          <View style={{ flex: 1 }}>
            <IconSymbol
              size={260}
              color="#0a7ea4"
              name="quote.bubble.fill"
              style={styles.headerImage}
            />
          </View>
        }>
        <ThemedView style={styles.hero}>
          <ThemedText type="title">{headerText}</ThemedText>
          <ThemedText style={styles.jokeText}>{joke}</ThemedText>
{/*
          {fromNotification ? (
            <ThemedText style={styles.meta}>
              (LlegИ desde la カltima notificaciИn)
            </ThemedText>
          ) : (
            <ThemedText style={styles.meta}>Aleatorio local</ThemedText>
          )}
*/}
          <Pressable
            style={[
              styles.button,
              { backgroundColor: primaryColor },
            ]}
            onPress={handleNewJoke}
            accessibilityRole="button">
            <ThemedText style={styles.buttonText}>Otro chiste</ThemedText>
          </Pressable>
        </ThemedView>
      </ParallaxScrollView>
      <Pressable
        style={{
          position: 'absolute',
          right: 16,
          bottom: insets.bottom + 16,
          paddingVertical: 10,
          paddingHorizontal: 14,
          borderRadius: 12,
          backgroundColor: primaryColor,
        }}
        onPress={() => router.push('/settings')}
        accessibilityRole="button">
        <ThemedText style={{ color: '#fff', fontWeight: '700' }}>Ajustar hora</ThemedText>
      </Pressable>
    </View>
  );
}

// estilos en styles/screens.ts
