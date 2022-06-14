/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import v from '../styles/styleVariables';
import {View, Image, Text} from 'react-native';
import gs from '../styles/globalStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function MovieCard(props) {
  const handleDetail = () => {
    props.navigation.navigate('MoviesNavigator', {
      screen: 'MovieDetail',
    });
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
        source={require('../assets/img/blankPoster.png')}
        style={{width: 120, height: 180, borderRadius: 8, marginBottom: 12}}
      />
      <Text style={[gs.h6, {textAlign: 'center'}]}>Movie Name</Text>
      <Text
        style={[gs.p, {fontSize: 14, textAlign: 'center', marginBottom: 16}]}>
        Movie Category
      </Text>
      <TouchableOpacity
        style={[
          gs.btnOutlinePrimary,
          {paddingVertical: 8, marginBottom: 0, borderRadius: 8},
        ]}
        onPress={handleDetail}>
        <Text style={gs.btnOutlinePrimaryText}>Detail</Text>
      </TouchableOpacity>
    </View>
  );
}
