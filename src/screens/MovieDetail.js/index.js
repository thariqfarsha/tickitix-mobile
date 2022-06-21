/* eslint-disable react-native/no-inline-styles */
import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Feather';
import gs from '../../styles/globalStyles';
import v from '../../styles/styleVariables';
import ScheduleCard from '../../components/ScheduleCard';
import HLine from '../../components/HLine';
import Footer from '../../components/Footer';
import axios from '../../utils/axios';
import {useDispatch} from 'react-redux';
import {createDataBooking} from '../../stores/actions/booking';

export default function MovieDetail(props) {
  const dispatch = useDispatch();

  const movie = props.route.params;

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 2;
  const [search, setSearch] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showtime, setShowtime] = useState('');
  const [dataBooking, setDataBooking] = useState({
    scheduleId: null,
    dateBooking: '',
    timeBooking: '',
    paymentMethod: '',
    totalPayment: null,
    seats: [],
  });

  const cinemaLocation = ['Jakarta', 'Bogor', 'Depok'];

  useEffect(() => {
    setPage(1);
    getSchedules();
  }, []);

  useEffect(() => {
    getSchedules();
  }, [page]);

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

  const getSchedules = async () => {
    try {
      const result = await axios.get(
        `schedule?page=${page}&limit=${limit}&movieId=${movie.id}&searchLocation=${search}`,
      );
      if (page === 1) {
        setSchedules(result.data.data);
        setTotalPage(result.data.pagination.totalPage);
      } else {
        setSchedules([...schedules, ...result.data.data]);
      }
      setRefresh(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRefresh = () => {
    getSchedules();
  };

  const handleLoadMore = () => {
    setLoading(true);
    setPage(page + 1);
    getSchedules();
  };

  const handleBookSchedule = () => {
    dispatch(createDataBooking(dataBooking));
    props.navigation.navigate('Order');
  };

  console.log(schedules);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{...gs.container, paddingHorizontal: 0}}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
      }>
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
            source={
              movie
                ? {uri: movie.imagePath}
                : require('../../assets/img/blankPoster.png')
            }
            style={{borderRadius: 12, height: 240, width: 160}}
          />
        </View>
        <Text
          style={{...gs.h2, textAlign: 'center', lineHeight: 36, width: '80%'}}>
          {movie.name}
        </Text>
        <Text style={{...gs.p, fontSize: 18, textAlign: 'center'}}>
          {movie.category}
        </Text>
      </View>
      <View style={gs.section}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <View style={{width: '50%', marginBottom: 16}}>
            <Text style={gs.p}>Release Date</Text>
            <Text style={gs.h5}>
              {movie ? movie.releaseDate.split('T')[0] : ''}
            </Text>
          </View>
          <View style={{width: '50%', marginBottom: 16}}>
            <Text style={gs.p}>Directed By</Text>
            <Text style={gs.h5}>{movie.director}</Text>
          </View>
          <View style={{width: '50%', marginBottom: 16}}>
            <Text style={gs.p}>Duration</Text>
            <Text style={gs.h5}>{movie.duration}</Text>
          </View>
          <View style={{width: '50%', marginBottom: 16}}>
            <Text style={gs.p}>Casts</Text>
            <Text style={gs.h5}>{movie.cast}</Text>
          </View>
        </View>
      </View>
      <View style={{...gs.section, marginBottom: 24}}>
        <Text style={gs.h5}>Synopsis</Text>
        <Text style={gs.p}>{movie.synopsis}</Text>
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
          {schedules.map(schedule => (
            <View key={schedule.id}>
              <ScheduleCard
                data={schedule}
                dataBooking={dataBooking}
                setDataBooking={setDataBooking}
                handleBook={handleBookSchedule}
                showtime={showtime}
                setShowtime={setShowtime}
              />
            </View>
          ))}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <HLine />
          <TouchableOpacity
            style={{paddingHorizontal: 16}}
            onPress={handleLoadMore}
            disabled={!loading && page === totalPage ? true : false}>
            <Text
              style={{
                fontSize: 16,
                color: v.color.primary,
                fontWeight: '600',
                marginBottom: 4,
              }}>
              {loading ? (
                <ActivityIndicator size="small" color={v.color.primary} />
              ) : page < totalPage ? (
                'view more'
              ) : (
                '\u25cf'
              )}
            </Text>
          </TouchableOpacity>
          <HLine />
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}
