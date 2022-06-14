import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Login from '../screens/Login';
import Register from '../screens/Register';

function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        component={Login}
        name="Login"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={Register}
        name="Register"
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
