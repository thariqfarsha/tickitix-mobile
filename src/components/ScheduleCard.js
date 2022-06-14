/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import gs from '../styles/globalStyles';
import v from '../styles/styleVariables';
import HLine from './HLine';

export default function ScheduleCard(props) {
  const showtimes = [
    '08:00am',
    '10:30am',
    '01:00pm',
    '02:30pm',
    '04:00pm',
    '05:30pm',
    '07:00pm',
    '09:30pm',
  ];
  const [showtime, setShowtime] = useState('');

  return (
    <View
      style={{
        backgroundColor: v.color.white,
        borderRadius: 16,
        padding: 28,
        alignItems: 'center',
        marginBottom: 20,
      }}>
      <Image
        source={require('../assets/img/logo/cinema/ebv.id.png')}
        style={{marginBottom: 16}}
      />
      <Text style={gs.p}>Whatever street No.12, South Purwokerto</Text>
      <HLine />
      <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 12}}>
        {showtimes.map((time, i) => (
          <TouchableOpacity
            key={i}
            style={{width: '25%', marginBottom: 12}}
            onPress={() => setShowtime(time)}>
            <Text
              style={{
                ...gs.p,
                textAlign: 'center',
                color: showtime === time ? v.color.primary : v.color.body,
                fontWeight: showtime === time ? '600' : '400',
              }}>
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          paddingVertical: 12,
        }}>
        <Text style={{...gs.p, fontSize: 18}}>Price</Text>
        <Text style={gs.h5}>Rp 50.000</Text>
      </View>
      <TouchableOpacity
        style={{
          ...gs.btnPrimary,
          width: '100%',
          paddingVertical: 12,
          marginBottom: 0,
        }}
        activeOpacity={0.8}
        onPress={props.handleBook}>
        <Text style={gs.btnPrimaryText}>Book now</Text>
      </TouchableOpacity>
    </View>
  );
}
