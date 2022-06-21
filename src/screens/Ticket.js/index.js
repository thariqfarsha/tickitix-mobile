/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import gs from '../../styles/globalStyles';
import v from '../../styles/styleVariables';

export default function Ticket() {
  const edgeSize = 24;

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
              value="https://tickitix.herokuapp.com/booking/ticket/9"
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
              <Text style={gs.h5}>Spiderman</Text>
            </View>
            <View style={{width: '45%', marginBottom: 12}}>
              <Text style={gs.p}>Category</Text>
              <Text style={gs.h5}>Action</Text>
            </View>
            <View style={{width: '55%', marginBottom: 12}}>
              <Text style={gs.p}>Date</Text>
              <Text style={gs.h5}>July 7</Text>
            </View>
            <View style={{width: '45%', marginBottom: 12}}>
              <Text style={gs.p}>Time</Text>
              <Text style={gs.h5}>2:00pm</Text>
            </View>
            <View style={{width: '55%', marginBottom: 12}}>
              <Text style={gs.p}>Count</Text>
              <Text style={gs.h5}>3 pcs</Text>
            </View>
            <View style={{width: '45%', marginBottom: 12}}>
              <Text style={gs.p}>Seats</Text>
              <Text style={gs.h5}>C1, C2, C3</Text>
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
            <Text style={{...gs.h5, marginBottom: 0}}>Rp 150.000</Text>
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
