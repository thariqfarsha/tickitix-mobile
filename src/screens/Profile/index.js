/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Image,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import HLine from '../../components/HLine';
import gs from '../../styles/globalStyles';
import v from '../../styles/styleVariables';

function ProfileRoute(props) {
  const [isUpdateProfile, setIsUpdateProfile] = useState(false);
  const [isUpdatePwd, setIsUpdatePwd] = useState(false);
  const [formProfile, setFormProfile] = useState({
    firstName: 'John',
    lastName: 'Tyler',
    email: 'johntyler@gmail.com',
    noTelp: '081234567890',
  });
  const [formPwd, setFormPwd] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const handleLogout = async () => {
    try {
      ToastAndroid.showWithGravity(
        'Logged out',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      await AsyncStorage.clear();
      props.navigation.navigate('AuthScreen', {
        screen: 'Login',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeFormProfile = (value, name) => {
    setFormProfile({...formProfile, [name]: value});
  };

  const handleChangeFormPwd = (value, name) => {
    setFormPwd({...formPwd, [name]: value});
  };

  const handleUpdateProfile = () => {
    console.log(formProfile);
    setIsUpdateProfile(false);
  };

  const handleUpdatePwd = () => {
    console.log(formPwd);
    setIsUpdatePwd(false);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: v.color.background}}>
      <View style={{...gs.container, backgroundColor: 'transparent'}}>
        <View
          style={{
            backgroundColor: v.color.white,
            borderRadius: 20,
            padding: 32,
            alignItems: 'center',
            marginBottom: 32,
          }}>
          <Image
            source={require('../../assets/img/blankProfile.png')}
            style={{
              height: 100,
              width: 100,
              resizeMode: 'cover',
              borderRadius: 100,
              marginBottom: 28,
            }}
          />
          <Text style={{...gs.h2, marginBottom: 8}}>John Tyler</Text>
          <Text style={gs.p}>Moviegoers</Text>
          <TouchableOpacity
            style={{
              ...gs.btnOutlinePrimary,
              paddingHorizontal: 40,
              marginBottom: 0,
              marginTop: 20,
            }}
            onPress={handleLogout}>
            <Text style={gs.btnOutlinePrimaryText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <Text style={gs.h2}>Account Settings</Text>
        <View
          style={{
            backgroundColor: v.color.white,
            borderRadius: 20,
            padding: 32,
          }}>
          <Text style={{...gs.h3, marginBottom: 0}}>Details Information</Text>
          <HLine />
          <View style={gs.inputGroup}>
            <Text style={gs.label}>First Name</Text>
            <TextInput
              style={gs.textInput}
              value={formProfile.firstName}
              editable={isUpdateProfile ? true : false}
              onChangeText={text => handleChangeFormProfile(text, 'firstName')}
            />
          </View>
          <View style={gs.inputGroup}>
            <Text style={gs.label}>Last Name</Text>
            <TextInput
              style={gs.textInput}
              value={formProfile.lastName}
              editable={isUpdateProfile ? true : false}
              onChangeText={text => handleChangeFormProfile(text, 'lastName')}
            />
          </View>
          <View style={gs.inputGroup}>
            <Text style={gs.label}>Email</Text>
            <TextInput
              style={gs.textInput}
              value={formProfile.email}
              editable={false}
            />
          </View>
          <View style={{...gs.inputGroup}}>
            <Text style={gs.label}>Phone Number</Text>
            <TextInput
              style={gs.textInput}
              value={formProfile.noTelp}
              editable={isUpdateProfile ? true : false}
              onChangeText={text => handleChangeFormProfile(text, 'noTelp')}
              keyboardType="number-pad"
            />
          </View>
          {!isUpdateProfile ? (
            <TouchableOpacity
              style={{...gs.btnPrimary, marginTop: 8, marginBottom: 0}}
              onPress={() => setIsUpdateProfile(true)}>
              <Text style={gs.btnPrimaryText}>Update Profile</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={{...gs.btnPrimary, marginTop: 8, marginBottom: 4}}
                onPress={handleUpdateProfile}>
                <Text style={gs.btnPrimaryText}>Save Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{...gs.btnOutlinePrimary, marginTop: 8, marginBottom: 0}}
                onPress={() => setIsUpdateProfile(false)}>
                <Text style={gs.btnOutlinePrimaryText}>Cancel</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <View
          style={{
            backgroundColor: v.color.white,
            borderRadius: 20,
            padding: 32,
          }}>
          <Text style={{...gs.h3, marginBottom: 0}}>Account and Privacy</Text>
          <HLine />
          {!isUpdatePwd ? (
            <TouchableOpacity
              style={{...gs.btnPrimary, marginTop: 8, marginBottom: 0}}
              onPress={() => setIsUpdatePwd(true)}>
              <Text style={gs.btnPrimaryText}>Update Password</Text>
            </TouchableOpacity>
          ) : (
            <>
              <View style={gs.inputGroup}>
                <Text style={gs.label}>New Password</Text>
                <TextInput
                  style={gs.textInput}
                  placeholder="Enter new password"
                  onChangeText={text =>
                    handleChangeFormPwd(text, 'newPassword')
                  }
                  secureTextEntry={true}
                />
              </View>
              <View style={gs.inputGroup}>
                <Text style={gs.label}>Confirm Password</Text>
                <TextInput
                  style={gs.textInput}
                  placeholder="Confirm your new password"
                  onChangeText={text =>
                    handleChangeFormPwd(text, 'confirmPassword')
                  }
                  secureTextEntry={true}
                />
              </View>
              <TouchableOpacity
                style={{...gs.btnPrimary, marginTop: 8, marginBottom: 4}}
                onPress={handleUpdatePwd}>
                <Text style={gs.btnPrimaryText}>Save Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{...gs.btnOutlinePrimary, marginTop: 8, marginBottom: 0}}
                onPress={() => setIsUpdatePwd(false)}>
                <Text style={gs.btnOutlinePrimaryText}>Cancel</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

function HistoryRoute(props) {
  const handleOpenTicket = () => {
    props.navigation.navigate('Ticket');
  };
  console.log(props);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: v.color.background}}>
      <View
        style={{
          ...gs.container,
          backgroundColor: 'transparent',
        }}>
        <View
          style={{
            backgroundColor: v.color.white,
            borderRadius: 16,
            padding: 32,
            marginBottom: 20,
            elevation: 8,
          }}>
          <Image
            source={require('../../assets/img/logo/cinema/cineOne21.png')}
            style={{
              width: 100,
              height: 30,
              resizeMode: 'contain',
              marginBottom: 12,
            }}
          />
          <Text style={gs.p}>Tuesday, 07 July 2022 - 04:30pm</Text>
          <Text style={gs.h3}>Spider-Man: Homecoming</Text>
          <HLine />
          <TouchableOpacity
            style={{
              ...gs.btnPrimary,
              backgroundColor: v.color.success,
              shadowColor: v.color.success,
              marginBottom: 0,
              marginTop: 8,
            }}
            activeOpacity={0.8}
            onPress={handleOpenTicket}>
            <Text style={{...gs.btnPrimaryText}}>Ticket in active</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: v.color.white,
            borderRadius: 16,
            padding: 32,
            marginBottom: 20,
            elevation: 8,
          }}>
          <Image
            source={require('../../assets/img/logo/cinema/ebv.id.png')}
            style={{
              width: 100,
              height: 30,
              resizeMode: 'contain',
              marginBottom: 12,
            }}
          />
          <Text style={gs.p}>Tuesday, 14 June 2022 - 02:00pm</Text>
          <Text style={gs.h3}>Avengers: End Game</Text>
          <HLine />
          <TouchableOpacity
            style={{
              ...gs.btnPrimary,
              backgroundColor: v.color.body,
              shadowColor: 'transparent',
              marginBottom: 0,
              marginTop: 8,
            }}
            activeOpacity={0.8}
            disabled>
            <Text style={{...gs.btnPrimaryText}}>Ticket used</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: v.color.white,
            borderRadius: 16,
            padding: 32,
            marginBottom: 20,
            elevation: 8,
          }}>
          <Image
            source={require('../../assets/img/logo/cinema/hiflix.png')}
            style={{
              width: 100,
              height: 30,
              resizeMode: 'contain',
              marginBottom: 12,
            }}
          />
          <Text style={gs.p}>Tuesday, 7 June 2022 - 02:00pm</Text>
          <Text style={gs.h3}>Dr. Strange</Text>
          <HLine />
          <TouchableOpacity
            style={{
              ...gs.btnPrimary,
              backgroundColor: v.color.body,
              shadowColor: 'transparent',
              marginBottom: 0,
              marginTop: 8,
            }}
            activeOpacity={0.8}
            disabled>
            <Text style={{...gs.btnPrimaryText}}>Ticket used</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

// const renderScene = SceneMap({
//   profile: ProfileRoute,
//   history: HistoryRoute,
// });

const renderScene = ({route, jumpTo}) => {
  switch (route.key) {
    case 'profile':
      return <ProfileRoute jumpTo={jumpTo} />;
    case 'history':
      return <HistoryRoute jumpTo={jumpTo} />;
  }
};

export default function Profile() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'profile', title: 'Account Details'},
    {key: 'history', title: 'Order History'},
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: v.color.primary}}
      style={{backgroundColor: v.color.white, elevation: 10}}
      renderLabel={({route, focused}) => (
        <Text
          style={{
            ...gs.p,
            color: focused ? v.color.primary : v.color.body,
            margin: 8,
          }}>
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
}
