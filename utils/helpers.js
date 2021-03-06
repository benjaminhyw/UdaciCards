import { AsyncStorage } from "react-native";
import { Notifications, Permissions } from "expo";

export function timeToString(time = Date.now()) {
  return time.toString();
}

const NOTIFICATION_KEY = "UdaciCards:notifications";

export function getDailyReminderValue() {
  return {
    today: "👋 Don't forget to take a quiz today!"
  };
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync()
  );
}

function createNotification() {
  return {
    title: "Take a quiz!",
    body: "🖐🏼 Don't forget to take a quiz today!",
    ios: { sound: true },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true
    }
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          Notifications.cancelAllScheduledNotificationsAsync();

          let tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(10);
          tomorrow.setMinutes(45);

          Notifications.scheduleLocalNotificationAsync(createNotification(), {
            time: tomorrow,
            repeat: "day"
          });

          AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
        });
      }
    });
}
