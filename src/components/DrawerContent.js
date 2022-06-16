import React from 'react';
import {View, Text, StyleSheet, ToastAndroid} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/Feather';

import AsyncStorage from '@react-native-async-storage/async-storage';
import HLine from './HLine';

function DrawerContent(props) {
  const handleLogout = async () => {
    try {
      ToastAndroid.showWithGravity(
        'Logged out',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      await AsyncStorage.clear();
      props.navigation.navigate('AuthScreen', {
        screen: 'Login',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.containerProfile}>
          <View style={styles.avatar} />
          <View style={styles.biodata}>
            <Text style={styles.title}>John Tyler</Text>
            <Text style={styles.caption}>@johntyler | 081234567890</Text>
          </View>
        </View>
        <HLine />
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.containerSection}>
        <DrawerItem
          label="Logout"
          icon={({color, size}) => (
            <Icon color={color} size={size} name="log-out" />
          )}
          onPress={handleLogout}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerProfile: {
    margin: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: 'gray',
    marginBottom: 12,
  },
  biodata: {
    // marginLeft: 15,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  caption: {
    fontSize: 16,
    textAlign: 'center',
  },
  containerSection: {
    marginBottom: 5,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 2,
  },
});

export default DrawerContent;
