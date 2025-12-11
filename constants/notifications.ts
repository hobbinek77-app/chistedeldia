import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export const NOTIFICATION_CHANNEL_ID = 'daily-jokes';

export async function ensureAndroidChannel() {
  if (Platform.OS !== 'android') return;

  await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNEL_ID, {
    name: 'Chistes diarios',
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [0, 250, 250, 250],
    sound: 'default',
    lights: true,
  });
}
