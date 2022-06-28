/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {registration} from '../../stores/actions/user';
import gs from '../../styles/globalStyles';
import v from '../../styles/styleVariables';
import validator from 'validator';

function Register(props) {
  const dispatch = useDispatch();

  const {isLoading, msg} = useSelector(state => state.user);

  const [isEmpty, setIsEmpty] = useState(true);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    noTelp: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    setForm({
      firstName: '',
      lastName: '',
      noTelp: '',
      email: '',
      password: '',
    });
  }, []);

  useEffect(() => {
    console.log('cek');
    Object.keys(form).map(item => {
      if (!validator.isEmpty(form[item])) {
        return setIsEmpty(false);
      }
      setIsEmpty(true);
    });
  }, [form]);

  const handleChangeForm = (text, name) => {
    if (name === 'noTelp') {
      setForm({...form, [name]: text});
    }
    setForm({...form, [name]: validator.trim(text)});
  };

  const handleRegister = async () => {
    try {
      await dispatch(registration(form));
      ToastAndroid.showWithGravity(
        `${msg}`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
      props.navigation.navigate('Login');
    } catch (error) {
      console.log(error);
      ToastAndroid.showWithGravity(
        `${error.response.data.msg}`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  };

  const toLogin = () => {
    props.navigation.navigate('Login');
  };

  return (
    // <View style={{backgroundColor: 'blue'}}>
    <ScrollView style={gs.container}>
      <View style={{paddingBottom: 40}}>
        <Image
          source={require('../../assets/img/logo/logo-color.png')}
          style={gs.logo}
        />
        <View style={gs.wrapper}>
          <Text style={gs.h1}>Sign Up</Text>
          <Text style={gs.p}>Fill your additional details</Text>
        </View>
        <View style={gs.inputGroup}>
          <Text style={gs.label}>First Name</Text>
          <TextInput
            style={gs.textInput}
            placeholder="First name"
            placeholderTextColor={gs.placeholder.color}
            onChangeText={text => handleChangeForm(text, 'firstName')}
          />
        </View>
        <View style={gs.inputGroup}>
          <Text style={gs.label}>Last Name</Text>
          <TextInput
            style={gs.textInput}
            placeholder="Last name"
            placeholderTextColor={gs.placeholder.color}
            onChangeText={text => handleChangeForm(text, 'lastName')}
          />
        </View>
        <View style={gs.inputGroup}>
          <Text style={gs.label}>Phone Number</Text>
          <TextInput
            style={gs.textInput}
            placeholder="08XXXXXXXXXX"
            placeholderTextColor={gs.placeholder.color}
            keyboardType="number-pad"
            maxLength={13}
            onChangeText={text => handleChangeForm(text, 'noTelp')}
          />
        </View>
        <View style={gs.inputGroup}>
          <Text style={gs.label}>Email</Text>
          <TextInput
            style={gs.textInput}
            placeholder="Enter your email"
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor={gs.placeholder.color}
            onChangeText={text => handleChangeForm(text, 'email')}
          />
        </View>
        <View style={[gs.inputGroup, gs.lastInputGroup]}>
          <Text style={gs.label}>Password</Text>
          <TextInput
            style={gs.textInput}
            placeholder="Enter your password"
            autoCapitalize="none"
            secureTextEntry={true}
            placeholderTextColor={gs.placeholder.color}
            onChangeText={text => handleChangeForm(text, 'password')}
          />
        </View>
        <TouchableOpacity
          style={isEmpty ? gs.btnPrimaryDisabled : gs.btnPrimary}
          activeOpacity={0.8}
          onPress={handleRegister}
          disabled={isEmpty}>
          <Text style={gs.btnPrimaryText}>
            {isLoading ? (
              <ActivityIndicator size="small" color={v.color.white} />
            ) : (
              'Sign up'
            )}
          </Text>
        </TouchableOpacity>
        <Text style={[gs.p, gs.textCenter]}>
          Already have an account?{' '}
          <Text style={gs.link} onPress={toLogin}>
            Sign in
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

export default Register;
