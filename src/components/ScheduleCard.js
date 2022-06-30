/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import gs from '../styles/globalStyles';
import v from '../styles/styleVariables';
import HLine from './HLine';
import numbro from 'numbro';
import '../utils/numbroLanguage';
numbro.setLanguage('id-ID');

export default function ScheduleCard(props) {
  const {
    id,
    premiere,
    price,
    location,
    dateStart,
    dateEnd,
    time: times,
    name,
  } = props ? props.data : {};

  const showtimes = times.split(',');

  const ebv = require('../assets/img/logo/cinema/ebv.id.png');
  const hiflix = require('../assets/img/logo/cinema/hiflix.png');
  const cineOne21 = require('../assets/img/logo/cinema/cineOne21.png');

  const selectShowtime = time => {
    props.setShowtime(`${id}-${time}`);
    props.setDataBooking({
      ...props.dataBooking,
      scheduleId: id,
      timeBooking: time,
      price,
      premiere,
      movieName: name,
    });
  };

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
          width: premiere === 'cineOne21' ? '60%' : '40%',
          marginBottom: premiere === 'cineOne21' ? 4 : 16,
        }}
        resizeMode="contain"
      />
      <Text style={gs.p}>{location}</Text>
      <HLine />
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: 12,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}>
        {showtimes.map((time, i) => (
          <TouchableOpacity
            key={i}
            style={{width: '25%', marginBottom: 12}}
            onPress={() => selectShowtime(time)}>
            <Text
              style={{
                ...gs.p,
                textAlign: 'center',
                color:
                  props.showtime === `${id}-${time}`
                    ? v.color.primary
                    : v.color.body,
                fontWeight: props.showtime === `${id}-${time}` ? '600' : '400',
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
        <Text style={gs.h5}>
          {numbro(price).formatCurrency({
            average: false,
            spaceSeparated: true,
            thousandSeparated: true,
          })}
          /seat
        </Text>
      </View>
      <TouchableOpacity
        style={{
          ...gs.btnPrimary,
          width: '100%',
          paddingVertical: 12,
          marginBottom: 0,
          backgroundColor:
            +props.showtime.split('-')[0] === +id
              ? v.color.primary
              : v.color.placeholder,
          elevation: +props.showtime.split('-')[0] === +id ? 10 : 0,
        }}
        activeOpacity={0.8}
        onPress={props.handleBook}
        disabled={+props.showtime.split('-')[0] === +id ? false : true}>
        <Text style={gs.btnPrimaryText}>
          {+props.showtime.split('-')[0] === +id
            ? 'Book now'
            : 'Choose showtime'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
