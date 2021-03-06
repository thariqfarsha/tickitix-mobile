import PushNotification from 'react-native-push-notification';

class Notification {
  constructor() {
    PushNotification.createChannel(
      {
        channelId: 'reminder-product', // (required)
        channelName: 'Reminder Product', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
    PushNotification.createChannel(
      {
        channelId: 'new-product', // (required)
        channelName: 'New Product', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
    PushNotification.createChannel(
      {
        channelId: 'show-reminder', // (required)
        channelName: 'Show Reminder', // (required)
        channelDescription: 'A channel for show reminder', // (optional) default: undefined.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }

  reminderProductNotification() {
    PushNotification.localNotification({
      /* iOS and Android properties */
      // id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      channelId: 'reminder-product',
      title: 'My Notification Title', // (optional)
      message: 'My Notification Message', // (required)
    });
  }

  scheduleProductNotification({title, message, date}) {
    PushNotification.localNotificationSchedule({
      /* iOS and Android properties */
      // id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      channelId: 'reminder-product',
      title, // (optional)
      message, // (required)
      date,
    });
  }

  showReminderNotification({title, message, date}) {
    PushNotification.localNotificationSchedule({
      /* iOS and Android properties */
      // id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      channelId: 'show-reminder',
      title, // (optional)
      message, // (required)
      date,
    });
  }

  getDeliveredNotifications() {
    PushNotification.getDeliveredNotifications(notif => console.log(notif));
  }

  getScheduledLocalNotifications() {
    PushNotification.getScheduledLocalNotifications(notif =>
      console.log(notif),
    );
  }
  cancelAllLocalNotifications() {
    PushNotification.cancelAllLocalNotifications();
  }
}

export default new Notification();
