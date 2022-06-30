/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import gs from '../../styles/globalStyles';
import v from '../../styles/styleVariables';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  RefreshControl,
} from 'react-native';
import MovieCard from '../../components/MovieCard';
import MonthFilter from '../../components/MonthFilter';
import Footer from '../../components/Footer';
import {useDispatch, useSelector} from 'react-redux';
import {getAllMovies} from '../../stores/actions/movie';
import axios from '../../utils/axios';

function Home(props) {
  const dispatch = useDispatch();

  const page = 1;
  const limit = 6;
  const sort = 'name asc';
  const search = '';
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [nowShowingMovies, setNowShowingMovies] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const upcomingMovies = useSelector(state => state.movie.data);

  const thisMonth = new Date().getMonth() + 1; //.getMonth() me-return angka bulan basis 0, jadi ditambahin 1
  const nextMonth = new Date().getMonth() + 2;

  useEffect(() => {
    setMonth(new Date().getMonth() + 1);
    getNowShowingMovies();
    getUpcomingMovies();
  }, []);

  useEffect(() => {
    getUpcomingMovies();
  }, [month]);

  const getNowShowingMovies = async () => {
    try {
      const result = await axios.get(
        `movie?page=${page}&limit=${limit}&searchName=${search}&sort=${sort}&searchRelease=${thisMonth}`,
      );
      setNowShowingMovies(result.data.data);
      setRefresh(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getUpcomingMovies = async () => {
    try {
      await dispatch(getAllMovies(page, limit, search, sort, month + 1));
      setRefresh(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewNowShowing = defaultMonth => {
    console.log('default month', defaultMonth);
    props.navigation.navigate('MoviesNavigator', {
      screen: 'ListMovie',
      params: defaultMonth,
    });
  };

  const handleRefresh = () => {
    setRefresh(true);
    getNowShowingMovies();
    getUpcomingMovies();
  };

  return (
    <>
      <StatusBar backgroundColor={v.color.white} barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: v.color.white}}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
        }>
        <View style={gs.container}>
          <Text style={[gs.p, {fontSize: 22}]}>
            Nearest Cinema, Newest Movie,
          </Text>
          <Text
            style={[
              gs.h1,
              {color: v.color.primary, fontWeight: '700', fontSize: 48},
            ]}>
            Find out now!
          </Text>
          <Image
            source={require('../../assets/img/hero-img.png')}
            style={{width: '100%', resizeMode: 'contain'}}
          />
        </View>
        <View style={[gs.container, {backgroundColor: '#D6D8E7'}]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 28,
            }}>
            <Text style={[gs.h2, {color: v.color.primary, marginBottom: 0}]}>
              Now Showing
            </Text>
            <TouchableOpacity onPress={() => handleViewNowShowing(thisMonth)}>
              <Text style={gs.link}>view all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {nowShowingMovies.map(movie => (
              <View key={movie.id}>
                <MovieCard {...props} data={movie} />
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={gs.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 28,
            }}>
            <Text style={[gs.h2, {marginBottom: 0}]}>Upcoming Movie</Text>
            <TouchableOpacity onPress={() => handleViewNowShowing(nextMonth)}>
              <Text style={gs.link}>view all</Text>
            </TouchableOpacity>
          </View>
          <MonthFilter
            month={month}
            setMonth={setMonth}
            firstMonth={new Date().getMonth() + 1}
          />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {upcomingMovies.map(movie => (
              <View key={movie.id}>
                <MovieCard {...props} data={movie} />
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={gs.container}>
          <View
            style={{
              backgroundColor: v.color.white,
              borderRadius: 12,
              padding: 32,
              margin: 16,
              elevation: 10,
              shadowColor: v.color.body,
              alignItems: 'center',
            }}>
            <Text style={(gs.p, {textAlign: 'center'})}>
              Be the vangurad of the
            </Text>
            <Text
              style={[
                gs.h1,
                {color: v.color.primary, textAlign: 'center', marginBottom: 28},
              ]}>
              Moviegoers
            </Text>
            <TextInput
              style={[
                gs.textInput,
                {paddingVertical: 8, width: '100%', marginBottom: 12},
              ]}
              placeholder="Type your email"
            />
            <TouchableOpacity
              style={[
                gs.btnPrimary,
                {paddingVertical: 12, width: '100%', marginBottom: 28},
              ]}>
              <Text style={gs.btnPrimaryText}>Join now</Text>
            </TouchableOpacity>
            <Text style={[gs.p, {textAlign: 'center'}]}>
              By joining you as a Tickitz member, we will always send you the
              latest updates via email .
            </Text>
          </View>
        </View>

        <Footer />
      </ScrollView>
    </>
  );
}

export default Home;
