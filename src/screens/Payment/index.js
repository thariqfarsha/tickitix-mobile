/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Footer from '../../components/Footer';
import gs from '../../styles/globalStyles';
import v from '../../styles/styleVariables';

export default function Payment() {
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
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{...gs.h3, fontWeight: '300'}}>Total Payment</Text>
          <Text style={{...gs.h3}}>Rp 150.000</Text>
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
            <TextInput style={gs.textInput} value="John Tyler" />
          </View>
          <View style={gs.inputGroup}>
            <Text style={gs.label}>Email</Text>
            <TextInput style={gs.textInput} value="johntyler@gmail.com" />
          </View>
          <View style={{...gs.inputGroup, marginBottom: 4}}>
            <Text style={gs.label}>Phone Number</Text>
            <TextInput style={gs.textInput} value="081234567890" />
          </View>
        </View>
        <TouchableOpacity style={gs.btnPrimary}>
          <Text style={gs.btnPrimaryText}>Pay your order</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </ScrollView>
  );
}
