import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import gs from '../../styles/globalStyles';

function Register(props) {
  const [email, onChangeEmail] = useState('');
  const [pwd, onChangePwd] = useState('');

  const handleRegister = () => {
    return;
  };

  const toLogin = () => {
    props.navigation.navigate('Login');
  };

  return (
    // <View style={{backgroundColor: 'blue'}}>
    <ScrollView style={gs.container}>
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
        />
      </View>
      <View style={gs.inputGroup}>
        <Text style={gs.label}>Last Name</Text>
        <TextInput
          style={gs.textInput}
          placeholder="Last name"
          placeholderTextColor={gs.placeholder.color}
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
        />
      </View>
      <View style={gs.inputGroup}>
        <Text style={gs.label}>Email</Text>
        <TextInput
          style={gs.textInput}
          onChangeText={onChangeEmail}
          value={email}
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
          onChangeText={onChangePwd}
          value={pwd}
          placeholder="Enter your password"
          autoCapitalize="none"
          secureTextEntry={true}
          placeholderTextColor={gs.placeholder.color}
        />
      </View>
      <TouchableOpacity
        style={gs.btnPrimary}
        activeOpacity={0.9}
        onPress={handleRegister}>
        <Text style={gs.btnPrimaryText}>Sign up</Text>
      </TouchableOpacity>
      <Text style={[gs.p, gs.textCenter]}>
        Already have an account?{' '}
        <Text style={gs.link} onPress={toLogin}>
          Sign in
        </Text>
      </Text>
    </ScrollView>
  );
}

export default Register;
