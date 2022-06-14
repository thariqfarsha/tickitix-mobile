import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import SplashScreen from '../screens/SplashScreen';
import AuthScreen from './auth';
import AppScreen from './app';

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashSreen">
        <Stack.Screen
          component={SplashScreen}
          name="SplashScreen"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={AuthScreen}
          name="AuthScreen"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={AppScreen}
          name="AppScreen"
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
