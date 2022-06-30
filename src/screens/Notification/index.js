import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Notification from '../../utils/notif';

export default function NotificationScreen() {
  const handleClickNotif = () => {
    console.log('notif clicked');

    // [without schedule]
    // Notification.reminderProductNotification();

    // [with schedule]
    const setNotification = {
      title: 'New Product',
      message: 'Buy it now',
      date: new Date(Date.now() + 5 * 1000),
    };
    console.log(setNotification);
    Notification.scheduleProductNotification(setNotification);
  };
  return (
    <View style={s.container}>
      <Text>Notif</Text>
      <Button title="Reminder Product" onPress={handleClickNotif} />
      <Text>-------------</Text>
      <Button
        title="get delivered notif"
        onPress={() => Notification.getDeliveredNotifications()}
      />
      <Text>-------------</Text>
      <Button
        title="get scheduled notif"
        onPress={() => Notification.getScheduledLocalNotifications()}
      />
      <Text>-------------</Text>
      <Button
        title="cancel all notif"
        onPress={() => Notification.cancelAllLocalNotifications()}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
