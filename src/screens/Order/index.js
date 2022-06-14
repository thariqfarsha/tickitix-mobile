/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Footer from '../../components/Footer';
import HLine from '../../components/HLine';
import Seat from '../../components/Seat';
import gs from '../../styles/globalStyles';
import v from '../../styles/styleVariables';

export default function Order(props) {
  const listSeat = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [reservedSeat, setReservedSeat] = useState(['A1', 'C7']);

  useEffect(() => {
    console.log(props.route.params);
  }, []);

  const handleSelectedSeat = data => {
    if (selectedSeat.includes(data)) {
      const deleteSeat = selectedSeat.filter(el => {
        return el !== data;
      });
      setSelectedSeat(deleteSeat);
    } else {
      setSelectedSeat([...selectedSeat, data]);
    }
  };

  const handleResetSeat = () => {
    setSelectedSeat([]);
  };

  const handleBookingSeat = () => {
    console.log(selectedSeat);
    props.navigation.navigate('Payment');
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      style={{
        backgroundColor: v.color.background,
      }}>
      <View style={{...gs.section, overflow: 'visible'}}>
        <Text style={gs.h2}>Choose Your Seat</Text>
        <View
          style={{
            backgroundColor: v.color.white,
            borderRadius: 16,
            width: '100%',
            height: 400,
            marginBottom: 32,
          }}>
          {/* <FlatList
            data={listSeat}
            keyExtractor={item => item}
            renderItem={({item}) => (
              <Seat
                seatAlphabhet={item}
                reserved={reservedSeat}
                selected={selectedSeat}
                selectSeat={handleSelectedSeat}
              />
            )}
          /> */}
        </View>
        <Text style={gs.h2}>Order Info</Text>
        <View
          style={{
            backgroundColor: v.color.white,
            borderRadius: 16,
            alignItems: 'center',
            padding: 28,
            elevation: 10,
            marginBottom: 40,
          }}>
          <Image
            source={require('../../assets/img/logo/cinema/ebv.id.png')}
            style={{marginBottom: 8}}
          />
          <Text style={{...gs.h1, fontWeight: '300', marginBottom: 20}}>
            ebv.id Cinema
          </Text>
          <Text style={gs.h3}>Spiderman: Homecoming</Text>
          <View style={{marginVertical: 16, width: '100%'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 4,
              }}>
              <Text style={{...gs.h5, fontWeight: '300'}}>
                Selasa, 20 Juni 2022
              </Text>
              <Text style={{...gs.h5, fontWeight: '600'}}>02:00pm</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 4,
              }}>
              <Text style={{...gs.h5, fontWeight: '300'}}>
                One ticket price
              </Text>
              <Text style={{...gs.h5, fontWeight: '600'}}>Rp 50.000</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{...gs.h5, fontWeight: '300'}}>Seat chosen</Text>
              <Text style={{...gs.h5, fontWeight: '600'}}>C1, C2, C3</Text>
            </View>
          </View>
          <HLine py={8} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: 8,
            }}>
            <Text style={{...gs.h3, fontWeight: '400'}}>Total Payment</Text>
            <Text style={{...gs.h3, fontWeight: '600', color: v.color.primary}}>
              Rp 150.000
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{...gs.btnPrimary, paddingVertical: 12}}
          onPress={handleBookingSeat}
          activeOpacity={0.8}>
          <Text style={gs.btnPrimaryText}>Checkout now</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </ScrollView>
  );
}
