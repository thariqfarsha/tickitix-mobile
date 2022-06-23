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
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {updateDataBooking} from '../../stores/actions/booking';
import axios from '../../utils/axios';

export default function Order(props) {
  const dispatch = useDispatch();

  const listSeat = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [reservedSeat, setReservedSeat] = useState([]);
  const [totalPayment, setTotalPayment] = useState(null);

  const dataBooking = useSelector(state => state.booking.data);

  useEffect(() => {
    getReservedSeat();
  }, [dataBooking.scheduleId, dataBooking.timeBooking]);

  useEffect(() => {
    setTotalPayment(selectedSeat.length * +dataBooking.price);
  }, [selectedSeat]);

  const getReservedSeat = async () => {
    try {
      const result = await axios.get(
        `booking/seat/?scheduleId=${dataBooking.scheduleId}&dateBooking=${dataBooking.dateBooking}&timeBooking=${dataBooking.timeBooking}`,
      );
      console.log(result.data);
      setReservedSeat(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleBookingSeat = () => {
    dispatch(updateDataBooking({seats: selectedSeat, totalPayment}));
    props.navigation.navigate('Payment');
  };

  const ebv = require('../../assets/img/logo/cinema/ebv.id.png');
  const hiflix = require('../../assets/img/logo/cinema/hiflix.png');
  const cineOne21 = require('../../assets/img/logo/cinema/cineOne21.png');

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
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
            marginBottom: 32,
            padding: 32,
          }}>
          <View
            style={{
              height: 4,
              backgroundColor: v.color.primary,
              marginBottom: 24,
            }}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{marginBottom: 28}}>
            <FlatList
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
            />
          </ScrollView>
          <Text style={{...gs.h3, marginBottom: 16}}>Seating key</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginEnd: 32,
              }}>
              <Icon
                name="arrow-down"
                size={24}
                color={v.color.primary}
                style={{marginEnd: 8}}
              />
              <Text style={{...gs.h5, fontWeight: '400', marginBottom: 0}}>
                A - G
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name="arrow-right"
                size={24}
                color={v.color.primary}
                style={{marginEnd: 8}}
              />
              <Text style={{...gs.h5, fontWeight: '400', marginBottom: 0}}>
                1 - 14
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginEnd: 20,
                marginBottom: 20,
              }}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 3,
                  backgroundColor: '#d6d8e7',
                  marginEnd: 12,
                }}
              />
              <Text style={{...gs.h6, fontWeight: '400', marginBottom: 0}}>
                Available
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginEnd: 20,
              }}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 3,
                  backgroundColor: '#5f2eea',
                  marginEnd: 12,
                }}
              />
              <Text style={{...gs.h6, fontWeight: '400', marginBottom: 0}}>
                Selected
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 3,
                  backgroundColor: '#6e7191',
                  marginEnd: 12,
                }}
              />
              <Text style={{...gs.h6, fontWeight: '400', marginBottom: 0}}>
                Sold
              </Text>
            </View>
          </View>
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
            source={
              dataBooking.premiere === 'ebv.id'
                ? ebv
                : dataBooking.premiere === 'hiflix'
                ? hiflix
                : dataBooking.premiere === 'cineOne21'
                ? cineOne21
                : ''
            }
            style={{
              marginBottom: 8,
              width: dataBooking.premiere === 'cineOne21' ? '40%' : '30%',
            }}
            resizeMode="contain"
          />
          <Text style={{...gs.h2, fontWeight: '300', marginBottom: 20}}>
            {dataBooking.premiere} Cinema
          </Text>
          <Text style={{...gs.h3, textAlign: 'center'}}>
            {dataBooking.movieName}
          </Text>
          <View style={{marginVertical: 16, width: '100%'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 4,
              }}>
              <Text style={{...gs.h5, fontWeight: '300'}}>Show date</Text>
              <Text style={{...gs.h5, fontWeight: '600'}}>
                {dataBooking.dateBooking}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 4,
              }}>
              <Text style={{...gs.h5, fontWeight: '300'}}>Show time</Text>
              <Text style={{...gs.h5, fontWeight: '600'}}>
                {dataBooking.timeBooking}
              </Text>
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
              <Text style={{...gs.h5, fontWeight: '600'}}>
                {dataBooking.price}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{...gs.h5, fontWeight: '300'}}>Seat chosen</Text>
              <Text style={{...gs.h5, fontWeight: '600'}}>
                {selectedSeat ? selectedSeat.join(', ') : ''}
              </Text>
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
              {totalPayment}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            ...gs.btnPrimary,
            paddingVertical: 12,
            backgroundColor:
              selectedSeat.length === 0 ? v.color.placeholder : v.color.primary,
            elevation: selectedSeat.length === 0 ? 0 : 10,
          }}
          onPress={handleBookingSeat}
          activeOpacity={0.8}
          disabled={selectedSeat.length === 0 ? true : false}>
          <Text style={gs.btnPrimaryText}>Checkout now</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </ScrollView>
  );
}
