/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, Text} from 'react-native';
import gs from '../styles/globalStyles';
import Icon from 'react-native-vector-icons/Feather';
import v from '../styles/styleVariables';

export default function Footer() {
  return (
    <View style={{...gs.container, backgroundColor: v.color.white}}>
      <View style={{marginBottom: 24}}>
        <Image
          source={require('../assets/img/logo/logo-color.png')}
          style={{marginBottom: 16}}
        />
        <Text style={[gs.p, {width: '80%'}]}>
          Stop waiting in line. Buy tickets conveniently, watch movies quietly.
        </Text>
      </View>
      <View style={{marginBottom: 24}}>
        <Text style={gs.h3}>Explore</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={[gs.link, {marginEnd: 12}]}>Home</Text>
          <Text style={gs.link}>List Movie</Text>
        </View>
      </View>
      <View style={{marginBottom: 24}}>
        <Text style={gs.h3}>Our Sponsors</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../assets/img/logo/cinema/ebv.id.png')}
            style={{width: 80, resizeMode: 'contain', marginEnd: 20}}
          />
          <Image
            source={require('../assets/img/logo/cinema/cineOne21.png')}
            style={{width: 120, resizeMode: 'contain', marginEnd: 20}}
          />
          <Image
            source={require('../assets/img/logo/cinema/hiflix.png')}
            style={{width: 80, resizeMode: 'contain'}}
          />
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Icon name="facebook" size={24} style={{marginEnd: 20}} />
        <Icon name="twitter" size={24} style={{marginEnd: 20}} />
        <Icon name="instagram" size={24} style={{marginEnd: 20}} />
        <Icon name="linkedin" size={24} />
      </View>
    </View>
  );
}
