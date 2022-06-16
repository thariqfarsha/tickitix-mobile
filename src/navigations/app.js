import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import DrawerContent from '../components/DrawerContent';
import Header from '../components/Header';
import v from '../styles/styleVariables';
import ListMovie from '../screens/ListMovie';
import MovieDetail from '../screens/MovieDetail.js';
import Order from '../screens/Order';
import Payment from '../screens/Payment';
import Ticket from '../screens/Ticket.js';

function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Home}
        name="Home"
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function MoviesNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={ListMovie}
        name="ListMovie"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={MovieDetail}
        name="MovieDetail"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={Order}
        name="Order"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={Payment}
        name="Payment"
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function ProfileNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Profile}
        name="Profile"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={Ticket}
        name="Ticket"
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{drawerPosition: 'right'}}>
      <Drawer.Screen
        component={HomeNavigator}
        name="HomeNavigator"
        options={{
          title: 'Home',
          header: props => <Header {...props} />,
          drawerIcon: ({size, color}) => (
            <Icon name="home" size={size} color={color} />
          ),
          drawerActiveBackgroundColor: '#e0d7f7',
          drawerActiveTintColor: v.color.primary,
          // drawerItemStyle: {paddingVertical: 4, paddingHorizontal: 4},
        }}
      />
      <Drawer.Screen
        component={MoviesNavigator}
        name="MoviesNavigator"
        options={{
          title: 'Movies',
          header: props => <Header {...props} />,
          drawerIcon: ({size, color}) => (
            <Icon name="film" size={size} color={color} />
          ),
          drawerActiveBackgroundColor: '#e0d7f7',
          drawerActiveTintColor: v.color.primary,
          // drawerItemStyle: {paddingVertical: 4, paddingHorizontal: 4},
        }}
      />
      <Drawer.Screen
        component={ProfileNavigator}
        name="ProfileNavigator"
        options={{
          title: 'Profile',
          header: props => <Header {...props} />,
          drawerIcon: ({size, color}) => (
            <Icon name="user" size={size} color={color} />
          ),
          drawerActiveBackgroundColor: '#e0d7f7',
          drawerActiveTintColor: v.color.primary,
          // drawerItemStyle: {paddingVertical: 4, paddingHorizontal: 4},
        }}
      />
    </Drawer.Navigator>
  );
}

export default AppNavigator;
