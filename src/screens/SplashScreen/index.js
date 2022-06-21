import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {View, StyleSheet, Image, StatusBar} from 'react-native';
import v from '../../styles/styleVariables';

function SplashScreen(props) {
  useEffect(() => {
    if (props.navigation?.navigate) {
      checkToken();
    }
  }, [props.navigation]);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      setTimeout(() => {
        if (token) {
          props.navigation.navigate('AppScreen');
        } else {
          props.navigation.navigate('AuthScreen');
        }
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <StatusBar backgroundColor={v.color.primary} barStyle="light-content" />
      <View style={s.container}>
        <Image source={require('../../assets/img/logo/logo-white.png')} />
      </View>
    </>
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
