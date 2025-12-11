import * as Notifications from 'expo-notifications';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect } from 'react';

export default function TabLayout() {
  const router = useRouter();

  useEffect(() => {
    let active = true;
    (async () => {
      const scheduled = await Notifications.getAllScheduledNotificationsAsync();
      if (!active) return;
      const hasDaily = scheduled.some(
        (item) => item.content?.data?.tag === 'daily-joke',
      );
      if (!hasDaily) {
        router.replace('/settings');
      }
    })();
    return () => {
      active = false;
    };
  }, [router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
