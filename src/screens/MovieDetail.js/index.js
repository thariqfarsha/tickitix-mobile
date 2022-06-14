/* eslint-disable react-native/no-inline-styles */
import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Feather';
import gs from '../../styles/globalStyles';
import v from '../../styles/styleVariables';
import ScheduleCard from '../../components/ScheduleCard';
import HLine from '../../components/HLine';
import Footer from '../../components/Footer';

export default function MovieDetail(props) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const cinemaLocation = ['Jakarta', 'Bogor', 'Depok'];

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const handleBookSchedule = () => {
    props.navigation.navigate('Order');
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{...gs.container, paddingHorizontal: 0}}>
      <View style={{...gs.section, alignItems: 'center', marginBottom: 16}}>
        <View
          style={{
            padding: 20,
            borderWidth: 2,
            borderColor: v.color.line,
            borderRadius: 16,
            marginBottom: 16,
          }}>
          <Image
            source={require('../../assets/img/blankPoster.png')}
            style={{borderRadius: 12}}
          />
        </View>
        <Text style={gs.h2}>Movie Title</Text>
        <Text style={{...gs.p, fontSize: 18}}>Movie Genre</Text>
      </View>
      <View style={gs.section}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <View style={{width: '50%', marginBottom: 16}}>
            <Text style={gs.p}>Release Date</Text>
            <Text style={gs.h5}>June 18, 2022 </Text>
          </View>
          <View style={{width: '50%', marginBottom: 16}}>
            <Text style={gs.p}>Directed By</Text>
            <Text style={gs.h5}>Jon Watss </Text>
          </View>
          <View style={{width: '50%', marginBottom: 16}}>
            <Text style={gs.p}>Duration</Text>
            <Text style={gs.h5}>2h 50m</Text>
          </View>
          <View style={{width: '50%', marginBottom: 16}}>
            <Text style={gs.p}>Casts</Text>
            <Text style={gs.h5}>Tom Holland, Robert Downey Jr., etc. </Text>
          </View>
        </View>
      </View>
      <View style={gs.section}>
        <Text style={gs.h5}>Synopsis</Text>
        <Text style={gs.p}>
          Thrilled by his experience with the Avengers, Peter returns home,
          where he lives with his Aunt May, under the watchful eye of his new
          mentor Tony Stark, Peter tries to fall back into his normal daily
          routine - distracted by thoughts of proving himself to be more than
          just your friendly neighborhood Spider-Man - but when the Vulture
          emerges as a new villain, everything that Peter holds most important
          will be threatened.
        </Text>
      </View>
      <View
        style={{
          ...gs.container,
          backgroundColor: v.color.background,
        }}>
        <Text style={{...gs.h3, textAlign: 'center', marginBottom: 24}}>
          Showtimes and Tickets
        </Text>
        <View style={{width: '100%', marginBottom: 32}}>
          <TouchableOpacity
            style={{
              ...gs.btnOutlinePrimary,
              backgroundColor: '#EFF0F6',
              borderWidth: 0,
              paddingVertical: 12,
              paddingHorizontal: 12,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            onPress={showDatepicker}>
            <Icon name="calendar" size={16} />

            <Text style={gs.btnOutlinePrimaryText}>
              {date.toLocaleString('id-ID', {dateStyle: 'short'})}
            </Text>
            <Icon name="chevron-down" size={16} />
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}
          <SelectDropdown
            data={cinemaLocation}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={selectedItem => selectedItem}
            rowTextForSelection={item => item}
            buttonStyle={{
              backgroundColor: '#EFF0F6',
              borderRadius: 16,
              width: 'auto',
              height: 'auto',
              paddingVertical: 8,
              flex: 1,
              marginStart: 8,
            }}
            buttonTextStyle={{...gs.p, marginBottom: 0}}
            renderDropdownIcon={() => <Icon name="chevron-down" size={16} />}
            defaultButtonText="Location"
          />
        </View>
        <View>
          <ScheduleCard handleBook={handleBookSchedule} />
          <ScheduleCard handleBook={handleBookSchedule} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <HLine />
          <TouchableOpacity style={{paddingHorizontal: 16}}>
            <Text
              style={{
                fontSize: 16,
                color: v.color.primary,
                fontWeight: '600',
                marginBottom: 4,
              }}>
              view more
            </Text>
          </TouchableOpacity>
          <HLine />
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}
