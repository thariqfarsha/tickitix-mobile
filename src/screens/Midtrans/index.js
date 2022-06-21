import React from 'react';
import WebView from 'react-native-webview';
import {useSelector} from 'react-redux';

export default function Midtrans(props) {
  const {redirectUrl} = useSelector(state => state.booking.data);

  return <WebView source={{uri: redirectUrl}} />;
}
