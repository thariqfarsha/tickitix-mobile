/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import v from '../styles/styleVariables';
import {View, Image, Text} from 'react-native';
import gs from '../styles/globalStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import truncateString from '../utils/truncateString';

export default function MovieCard(props) {
  const {name, category, imagePath} = props.data ? props.data : {};

  const handleDetail = dataMovie => {
    props.navigation.navigate('MoviesNavigator', {
      screen: 'MovieDetail',
      params: dataMovie,
    });
  };

  const moviePoster = {
    uri: imagePath
      ? imagePath
      : 'https://via.assets.so/img.jpg?w=400&h=150&tc=gray&bg=#cecece&t=...',
  };

  return (
    <View
      style={{
        backgroundColor: v.color.white,
        padding: 16,
        borderRadius: 12,
        marginEnd: 12,
        borderWidth: 1,
        borderColor: v.color.line,
      }}>
      <Image
        source={moviePoster}
        style={{width: 120, height: 180, borderRadius: 8, marginBottom: 12}}
        resizeMode="cover"
      />
      <Text style={[gs.h6, {textAlign: 'center'}]}>
        {name ? truncateString(name, 16) : ''}
      </Text>
      <Text
        style={[gs.p, {fontSize: 14, textAlign: 'center', marginBottom: 16}]}>
        {category ? truncateString(category) : ''}
      </Text>
      <TouchableOpacity
        style={[
          gs.btnOutlinePrimary,
          {paddingVertical: 8, marginBottom: 0, borderRadius: 8},
        ]}
        onPress={() => handleDetail(props.data)}>
        <Text style={gs.btnOutlinePrimaryText}>Detail</Text>
      </TouchableOpacity>
    </View>
  );
}
