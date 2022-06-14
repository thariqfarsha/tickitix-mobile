/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import v from '../styles/styleVariables';
import Icon from 'react-native-vector-icons/Feather';

export default function Header(props) {
  const openDrawer = () => {
    props.navigation.openDrawer();
  };

  return (
    <View style={s.header}>
      <View>
        <Image
          source={require('../assets/img/logo/logo-color.png')}
          style={{height: 28, resizeMode: 'contain'}}
        />
      </View>
      <TouchableOpacity onPress={openDrawer}>
        <Icon name="menu" size={28} />
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: '5%',
    backgroundColor: v.color.white,
  },
});
