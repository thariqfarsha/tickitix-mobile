/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getUserById} from '../../stores/actions/user';
import user from '../../stores/reducer/user';
import gs from '../../styles/globalStyles';
import v from '../../styles/styleVariables';
import axios from '../../utils/axios';

function Login(props) {
  const dispatch = useDispatch();
  const {isLoading} = useSelector(state => state.user);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChangeForm = (text, name) => {
    setForm({...form, [name]: text});
  };

  const handleLogin = async () => {
    try {
      const result = await axios.post('auth/login', form);
      await AsyncStorage.setItem('id', result.data.data.id);
      await AsyncStorage.setItem('token', result.data.data.token);
      await AsyncStorage.setItem('refreshToken', result.data.data.refreshToken);
      await dispatch(getUserById(result.data.data.id));
      props.navigation.navigate('AppScreen', {
        screen: 'Home',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const toRegister = () => {
    props.navigation.navigate('Register');
  };

  return (
    // <View style={{backgroundColor: 'blue'}}>
    <View style={{...gs.container, overflow: 'visible', flex: 1}}>
      <Image
        source={require('../../assets/img/logo/logo-color.png')}
        style={gs.logo}
      />
      <View style={gs.wrapper}>
        <Text style={gs.h1}>Sign In</Text>
        <Text style={gs.p}>
          Sign in with your data that you entered during your registration
        </Text>
      </View>
      <View style={gs.inputGroup}>
        <Text style={gs.label}>Email</Text>
        <TextInput
          style={gs.textInput}
          onChangeText={text => handleChangeForm(text, 'email')}
          placeholder="Enter your email"
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor={gs.placeholder.color}
        />
      </View>
      <View style={[gs.inputGroup, gs.lastInputGroup]}>
        <Text style={gs.label}>Password</Text>
        <TextInput
          style={gs.textInput}
          onChangeText={text => handleChangeForm(text, 'password')}
          placeholder="Enter your password"
          autoCapitalize="none"
          secureTextEntry={true}
          placeholderTextColor={gs.placeholder.color}
        />
      </View>
      <TouchableOpacity
        style={gs.btnPrimary}
        activeOpacity={0.9}
        onPress={handleLogin}>
        {isLoading ? (
          <ActivityIndicator color={v.color.white} size="small" />
        ) : (
          <Text style={gs.btnPrimaryText}>Sign in</Text>
        )}
      </TouchableOpacity>
      <Text style={[gs.p, gs.textCenter]}>
        Forgot your password? <Text style={gs.link}>Reset Now</Text>
      </Text>
      <Text style={[gs.p, gs.textCenter]}>
        Don't have an account?{' '}
        <Text style={gs.link} onPress={toRegister}>
          Sign up
        </Text>
      </Text>
    </View>
  );
}

export default Login;
