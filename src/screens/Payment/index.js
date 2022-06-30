/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Footer from '../../components/Footer';
import {createBooking} from '../../stores/actions/booking';
import gs from '../../styles/globalStyles';
import v from '../../styles/styleVariables';
import axios from '../../utils/axios';
import numbro from 'numbro';
import '../../utils/numbroLanguage';
numbro.setLanguage('id-ID');

export default function Payment(props) {
  const dispatch = useDispatch();

  const dataBooking = useSelector(state => state.booking.data);
  const user = useSelector(state => state.user.data);

  const {isLoading} = useSelector(state => state.booking);

  const {
    scheduleId,
    dateBooking,
    timeBooking,
    paymentMethod,
    totalPayment,
    seats,
  } = dataBooking;

  const formBooking = {
    scheduleId,
    dateBooking,
    timeBooking,
    paymentMethod,
    totalPayment,
    seats,
  };

  const handlePayment = async () => {
    try {
      await dispatch(createBooking(formBooking));
      props.navigation.navigate('Midtrans');
    } catch (error) {
      console.log(error);
    }
  };
  console.log(formBooking);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          backgroundColor: v.color.white,
          borderBottomRightRadius: 16,
          borderBottomLeftRadius: 16,
          paddingHorizontal: '6%',
          paddingVertical: 16,
          elevation: 10,
          marginBottom: 8,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{...gs.h3, fontWeight: '300', marginBottom: 0}}>
            Total Payment
          </Text>
          <Text style={{...gs.h2, marginBottom: 0}}>
            {numbro(dataBooking.totalPayment).formatCurrency({
              average: false,
              spaceSeparated: true,
              thousandSeparated: true,
            })}
          </Text>
        </View>
      </View>
      <View style={{...gs.container, backgroundColor: 'transparent'}}>
        <Text style={gs.h2}>Personal Info</Text>
        <View
          style={{
            backgroundColor: v.color.white,
            borderRadius: 16,
            padding: 28,
            marginBottom: 32,
          }}>
          <View style={gs.inputGroup}>
            <Text style={gs.label}>Full Name</Text>
            <TextInput
              style={gs.textInput}
              value={`${user.firstName} ${user.lastName}`}
              editable={false}
            />
          </View>
          <View style={gs.inputGroup}>
            <Text style={gs.label}>Email</Text>
            <TextInput
              style={gs.textInput}
              value={user.email}
              editable={false}
            />
          </View>
          <View style={{...gs.inputGroup, marginBottom: 4}}>
            <Text style={gs.label}>Phone Number</Text>
            <TextInput
              style={gs.textInput}
              value={user.noTelp}
              editable={false}
            />
          </View>
        </View>
        <TouchableOpacity
          style={gs.btnPrimary}
          activeOpacity={0.8}
          onPress={handlePayment}>
          <Text style={gs.btnPrimaryText}>
            {isLoading ? (
              <ActivityIndicator size="small" color={v.color.white} />
            ) : (
              'Pay your order'
            )}
          </Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </ScrollView>
  );
}
