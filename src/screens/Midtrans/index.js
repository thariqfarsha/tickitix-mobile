import React, {useRef} from 'react';
import {ToastAndroid} from 'react-native';
import WebView from 'react-native-webview';
import {useSelector} from 'react-redux';

export default function Midtrans(props) {
  const webview = useRef(null);
  console.log('webview:', webview);

  const {redirectUrl} = useSelector(state => state.booking.data);

  const handleWebViewNavigationStateChange = newNavState => {
    console.log('navState: ', newNavState);
    const {url} = newNavState;

    const regexp = /[?&]([^=#]+)=([^&#]*)/g;
    const params = {};
    let check;
    while ((check = regexp.exec(url))) {
      params[check[1]] = check[2];
    }
    console.log('params', params);

    if (!url) {
      return;
    }

    if (url.includes('?status_code=200')) {
      console.log('success');
      webview.current.stopLoading();
      props.navigation.navigate('ProfileNavigator', {
        screen: 'Ticket',
        params: {
          orderId: params.order_id,
        },
      });
      ToastAndroid.showWithGravity(
        "Here's your ticket. Have fun!",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }

    // if (url.includes('?errors=true')) {
    //   webview.stopLoading();
    // }
  };

  return (
    <WebView
      ref={webview}
      source={{uri: redirectUrl}}
      onNavigationStateChange={handleWebViewNavigationStateChange}
    />
  );
}
