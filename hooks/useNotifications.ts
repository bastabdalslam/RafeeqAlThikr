
import { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export function useNotifications() {
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    registerForPushNotifications();
  }, []);

  const registerForPushNotifications = async () => {
    try {
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('athkar-reminders', {
          name: 'Athkar Reminders',
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#D4AF37',
          sound: 'default',
        });
      }

      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus === 'granted') {
        setPermissionGranted(true);
        console.log('Notification permissions granted');
      } else {
        console.log('Notification permissions denied');
      }
    } catch (error) {
      console.error('Error registering for notifications:', error);
    }
  };

  const scheduleMorningAthkar = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Morning Athkar ☀️',
          body: 'Time for your morning remembrance of Allah',
          data: { type: 'morning', route: '/athkar/morning' },
          sound: 'default',
        },
        trigger: {
  type: 'daily',
  hour: 6,
  minute: 0,
} as Notifications.DailyTriggerInput,
      });
      console.log('Morning athkar notification scheduled');
    } catch (error) {
      console.error('Error scheduling morning athkar:', error);
    }
  };

  const scheduleEveningAthkar = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Evening Athkar 🌙',
          body: 'Time for your evening remembrance of Allah',
          data: { type: 'evening', route: '/athkar/evening' },
          sound: 'default',
        },
        trigger: { 
  type: 'daily',
  hour: 18,
  minute: 0,
} as Notifications.DailyTriggerInput,
      });
      console.log('Evening athkar notification scheduled');
    } catch (error) {
      console.error('Error scheduling evening athkar:', error);
    }
  };

  const cancelAllNotifications = async () => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      console.log('All notifications cancelled');
    } catch (error) {
      console.error('Error cancelling notifications:', error);
    }
  };

  return {
    permissionGranted,
    scheduleMorningAthkar,
    scheduleEveningAthkar,
    cancelAllNotifications,
  };
}
