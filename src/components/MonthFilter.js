/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import gs from '../styles/globalStyles';

export default function MonthFilter(props) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'Septerber',
    'October',
    'November',
    'December',
  ];

  const upcomingMonths = [
    ...months.slice(new Date().getMonth() + 1, months.length),
    ...months.slice(0, new Date().getMonth() + 1),
  ];

  const selectedMonth = months[props.month];

  const handleSetMonth = month => {
    const index = months.indexOf(month);
    props.setMonth(index);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{marginBottom: 8}}>
      {upcomingMonths.map(month => (
        <TouchableOpacity
          style={[
            selectedMonth === month ? gs.btnPrimary : gs.btnOutlinePrimary,
            {paddingVertical: 8, width: 84, borderRadius: 8, marginEnd: 6},
          ]}
          key={month}
          onPress={() => handleSetMonth(month)}>
          <Text
            style={
              selectedMonth === month
                ? gs.btnPrimaryText
                : gs.btnOutlinePrimaryText
            }>
            {month}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
