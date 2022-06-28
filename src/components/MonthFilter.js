/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import gs from '../styles/globalStyles';
import v from '../styles/styleVariables';

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
    'September',
    'October',
    'November',
    'December',
  ];

  const upcomingMonths = [
    ...months.slice(props.firstMonth, months.length),
    ...months.slice(0, props.firstMonth),
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
            selectedMonth === month
              ? {...gs.btnPrimary, borderWidth: 1, borderColor: v.color.primary}
              : gs.btnOutlinePrimary,
            {paddingVertical: 8, width: 88, borderRadius: 8, marginEnd: 6},
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
