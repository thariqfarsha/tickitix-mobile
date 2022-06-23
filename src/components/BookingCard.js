/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import gs from '../styles/globalStyles';
import v from '../styles/styleVariables';
import axios from '../utils/axios';
import HLine from './HLine';

export default function BookingCard(props) {
  const {id, scheduleId, dateBooking, timeBooking, name, statusUsed} =
    props.data;

  const [premiere, setPremiere] = useState('');

  // useEffect(() => {
  //   getPremiere();
  // }, []);

  // const getPremiere = async () => {
  //   try {
  //     const result = await axios.get(`schedule/${scheduleId}`);
  //     setPremiere(result.data.data.premiere);
  //   } catch (error) {
  //     console.log(error.response.data);
  //   }
  // };

  const ebv = require('../assets/img/logo/cinema/ebv.id.png');
  const hiflix = require('../assets/img/logo/cinema/hiflix.png');
  const cineOne21 = require('../assets/img/logo/cinema/cineOne21.png');

  return (
    <View
      style={{
        backgroundColor: v.color.white,
        borderRadius: 16,
        padding: 32,
        marginBottom: 20,
        elevation: 8,
      }}>
      <Image
        source={
          premiere === 'ebv.id'
            ? ebv
            : premiere === 'hiflix'
            ? hiflix
            : premiere === 'cineOne21'
            ? cineOne21
            : ''
        }
        style={{
          width: 100,
          height: 30,
          resizeMode: 'contain',
          marginBottom: 12,
        }}
      />
      <Text style={gs.p}>
        {dateBooking ? dateBooking.split('T')[0] : ''} - {timeBooking}
      </Text>
      <Text style={gs.h3}>{name}</Text>
      <HLine />
      <TouchableOpacity
        style={{
          ...gs.btnPrimary,
          backgroundColor:
            statusUsed === 'active' ? v.color.success : v.color.placeholder,
          shadowColor:
            statusUsed === 'active' ? v.color.success : v.color.placeholder,
          marginBottom: 0,
          marginTop: 8,
        }}
        activeOpacity={0.8}
        onPress={() => props.handleOpenTicket(id)}>
        <Text style={{...gs.btnPrimaryText}}>
          {statusUsed === 'active' ? 'Ticket in active' : 'Ticket used'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
