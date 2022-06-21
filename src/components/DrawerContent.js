/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator,
  Image,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/Feather';

import AsyncStorage from '@react-native-async-storage/async-storage';
import HLine from './HLine';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../stores/actions/user';

function DrawerContent(props) {
  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.user.isLoading);
  const user = useSelector(state => state.user.data);

  const handleLogout = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      await dispatch(logout(refreshToken));
      await AsyncStorage.clear();
      props.navigation.navigate('AuthScreen', {
        screen: 'Login',
      });
      ToastAndroid.showWithGravity(
        'Logged out',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.containerProfile}>
          <View style={styles.avatar}>
            <Image
              source={
                user.imagePath
                  ? {uri: user.imagePath, width: 60, height: 60}
                  : require('../assets/img/blankProfile.png')
              }
              resizeMode="cover"
              style={{borderRadius: 100}}
            />
          </View>
          <View style={styles.biodata}>
            <Text
              style={styles.title}>{`${user.firstName} ${user.lastName}`}</Text>
            <Text style={styles.caption}>@johntyler | {user.noTelp}</Text>
          </View>
        </View>
        <HLine />
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.containerSection}>
        <DrawerItem
          label="Logout"
          icon={({color, size}) =>
            isLoading ? (
              <ActivityIndicator color={color} size="small" />
            ) : (
              <Icon color={color} size={size} name="log-out" />
            )
          }
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
