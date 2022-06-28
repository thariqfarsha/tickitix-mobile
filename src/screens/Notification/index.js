import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Notification() {
  return (
    <View style={s.container}>
      <Text>Notif</Text>
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
