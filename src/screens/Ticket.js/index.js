/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {BackHandler, ScrollView, Text, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import gs from '../../styles/globalStyles';
import v from '../../styles/styleVariables';
import axios from '../../utils/axios';

export default function Ticket(props) {
  const {orderId} = props.route.params;

  const edgeSize = 24;
  const [booking, setBooking] = useState({});

  useEffect(() => {
    getBooking();

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        props.navigation.navigate('ProfileNavigator', {
          screen: 'Profile',
        });
      },
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  const getBooking = async () => {
    try {
      const result = await axios.get(`booking/id/${orderId}`);
      setBooking(result.data.data);
      console.log(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(props);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: v.color.background}}>
      <View style={{...gs.container, backgroundColor: 'transparent'}}>
        <View
          style={{
            backgroundColor: v.color.white,
            marginHorizontal: 32,
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                backgroundColor: v.color.background,
                width: edgeSize,
                height: edgeSize,
                borderBottomEndRadius: 100,
              }}
            />
            <View
              style={{
                backgroundColor: v.color.background,
                width: edgeSize,
                height: edgeSize,
                borderBottomStartRadius: 100,
              }}
            />
          </View>
          <View style={{marginVertical: 24}}>
            <QRCode
              value={`https://tickitix.herokuapp.com/booking/ticket/${orderId}`}
              size={140}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                backgroundColor: v.color.background,
                width: edgeSize,
                height: edgeSize,
                borderTopEndRadius: 100,
              }}
            />
            <View
              style={{
                backgroundColor: v.color.background,
                width: edgeSize,
                height: edgeSize,
                borderTopStartRadius: 100,
              }}
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: v.color.white,
            marginHorizontal: 32,
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                backgroundColor: v.color.background,
                width: edgeSize,
                height: edgeSize,
                borderBottomEndRadius: 100,
              }}
            />
            <View
              style={{
                height: 1,
                borderWidth: 1,
                borderStyle: 'dashed',
                width: '80%',
                borderColor: v.color.line,
              }}
            />
            <View
              style={{
                backgroundColor: v.color.background,
                width: edgeSize,
                height: edgeSize,
                borderBottomStartRadius: 100,
              }}
            />
          </View>
          <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              paddingHorizontal: 40,
              paddingVertical: 20,
            }}>
            <View style={{width: '55%', marginBottom: 12}}>
              <Text style={gs.p}>Movie</Text>
              <Text style={gs.h5}>{booking.name}</Text>
            </View>
            <View style={{width: '45%', marginBottom: 12}}>
              <Text style={gs.p}>Category</Text>
              <Text style={gs.h5}>{booking.category}</Text>
            </View>
            <View style={{width: '55%', marginBottom: 12}}>
              <Text style={gs.p}>Date</Text>
              <Text style={gs.h5}>
                {booking.dateBooking ? booking.dateBooking.split('T')[0] : ''}
              </Text>
            </View>
            <View style={{width: '45%', marginBottom: 12}}>
              <Text style={gs.p}>Time</Text>
              <Text style={gs.h5}>{booking.timeBooking}</Text>
            </View>
            <View style={{width: '55%', marginBottom: 12}}>
              <Text style={gs.p}>Count</Text>
              <Text style={gs.h5}>{`${booking.totalTicket} ${
                booking.totalTicket > 1 ? 'pcs' : 'pc'
              }`}</Text>
            </View>
            <View style={{width: '45%', marginBottom: 12}}>
              <Text style={gs.p}>Seats</Text>
              <Text style={gs.h5}>
                {booking.seat ? booking.seat.join(', ') : ''}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: v.color.line,
              padding: 16,
              justifyContent: 'space-between',
              borderRadius: 12,
              width: '80%',
              marginBottom: 20,
            }}>
            <Text style={{...gs.h5, marginBottom: 0}}>Total</Text>
            <Text style={{...gs.h5, marginBottom: 0}}>
              {booking.totalPayment}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                backgroundColor: v.color.background,
                width: edgeSize,
                height: edgeSize,
                borderTopEndRadius: 100,
              }}
            />
            <View
              style={{
                backgroundColor: v.color.background,
                width: edgeSize,
                height: edgeSize,
                borderTopStartRadius: 100,
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
