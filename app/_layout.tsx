import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import 'react-native-reanimated';

import { HamburgerMenu } from '@/components/hamburger-menu';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          <Stack.Screen name="settings" options={{ headerShown: false }} />
          <Stack.Screen name="about" options={{ headerShown: false }} />
        </Stack>
        <View
          pointerEvents="box-none"
          style={{
            position: 'absolute',
            top: insets.top + 12,
            right: 16,
            zIndex: 100,
          }}>
          <HamburgerMenu />
        </View>
      </View>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
