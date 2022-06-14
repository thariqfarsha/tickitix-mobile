/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import gs from '../../styles/globalStyles';
import v from '../../styles/styleVariables';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import MovieCard from '../../components/MovieCard';
import MonthFilter from '../../components/MonthFilter';
import Footer from '../../components/Footer';

function Home() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: v.color.white}}>
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
          <Text style={gs.link}>view all</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
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
          <Text style={gs.link}>view all</Text>
        </View>
        <MonthFilter month={month} setMonth={setMonth} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
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
  );
}

export default Home;
