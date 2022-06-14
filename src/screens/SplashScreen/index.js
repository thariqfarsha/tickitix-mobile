import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';

function SplashScreen(props) {
  useEffect(() => {
    setTimeout(() => {
      const token = checkToken();
      if (token) {
        props.navigation.navigate('AppScreen');
      } else {
        props.navigation.navigate('AuthScreen');
      }
    }, 2000);
  });

  const checkToken = async () => {
    await AsyncStorage.getItem('token');
  };

  return (
    <View style={s.container}>
      <Image source={require('../../assets/img/logo/logo-white.png')} />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    backgroundColor: '#5F2EEA',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default SplashScreen;
