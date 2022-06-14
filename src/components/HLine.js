/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import v from '../styles/styleVariables';

export default function HLine(props) {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: v.color.line,
        width: '100%',
        flex: 1,
        marginVertical: props.py || 16,
      }}
    />
  );
}
