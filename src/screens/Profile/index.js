/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Image,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import BookingCard from '../../components/BookingCard';
import HLine from '../../components/HLine';
import {getUserById, updateProfile, updatePwd} from '../../stores/actions/user';
import gs from '../../styles/globalStyles';
import v from '../../styles/styleVariables';
import axios from '../../utils/axios';

// const renderScene = SceneMap({
//   profile: ProfileRoute,
//   history: HistoryRoute,
// });

export default function Profile(props) {
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

  function ProfileRoute() {
    const dispatch = useDispatch();

    const {data: user, isLoading, msg} = useSelector(state => state.user);

    const [isNewPwdShown, setIsNewPwdShown] = useState(false);
    const [isConfirmPwdShown, setIsConfirmPwdShown] = useState(false);
    const [isUpdateProfile, setIsUpdateProfile] = useState(false);
    const [isUpdatePwd, setIsUpdatePwd] = useState(false);
    const [formProfile, setFormProfile] = useState({
      firstName: user.firstName,
      lastName: user.lastName,
      noTelp: user.noTelp,
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

    const handleUpdateProfile = async () => {
      try {
        await dispatch(updateProfile(user.id, formProfile));
        await dispatch(getUserById(user.id));
        setIsUpdateProfile(false);
        ToastAndroid.showWithGravity(
          'Profile updated',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      } catch (error) {
        console.log(error);
      }
    };

    const handleUpdatePwd = async () => {
      try {
        await dispatch(updatePwd(user.id, formPwd));
        setIsUpdatePwd(false);
        ToastAndroid.showWithGravity(
          'Password updated',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      } catch (error) {
        console.log(error);
        ToastAndroid.showWithGravity(
          `${msg}`,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
        );
      }
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
              source={
                user.imagePath
                  ? {uri: user.imagePath}
                  : require('../../assets/img/blankProfile.png')
              }
              style={{
                height: 100,
                width: 100,
                resizeMode: 'cover',
                borderRadius: 100,
                marginBottom: 28,
              }}
            />
            <Text
              style={{
                ...gs.h2,
                marginBottom: 8,
              }}>{`${user.firstName} ${user.lastName}`}</Text>
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
              marginBottom: 32,
            }}>
            <Text style={{...gs.h3, marginBottom: 0}}>Details Information</Text>
            <HLine />
            <View style={gs.inputGroup}>
              <Text style={gs.label}>First Name</Text>
              <TextInput
                style={gs.textInput}
                value={formProfile.firstName}
                editable={isUpdateProfile ? true : false}
                onChangeText={text =>
                  handleChangeFormProfile(text, 'firstName')
                }
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
                value={user.email}
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
                activeOpacity={0.8}
                onPress={() => setIsUpdateProfile(true)}>
                <Text style={gs.btnPrimaryText}>Update Profile</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  style={{...gs.btnPrimary, marginTop: 8, marginBottom: 4}}
                  activeOpacity={0.8}
                  onPress={handleUpdateProfile}>
                  {isLoading ? (
                    <ActivityIndicator size="small" color={v.color.white} />
                  ) : (
                    <Text style={gs.btnPrimaryText}>Save Changes</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...gs.btnOutlinePrimary,
                    marginTop: 8,
                    marginBottom: 0,
                  }}
                  activeOpacity={0.8}
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
                activeOpacity={0.8}
                onPress={() => setIsUpdatePwd(true)}>
                <Text style={gs.btnPrimaryText}>Update Password</Text>
              </TouchableOpacity>
            ) : (
              <>
                <View style={gs.inputGroup}>
                  <Text style={gs.label}>New Password</Text>
                  <View style={{position: 'relative'}}>
                    <TextInput
                      style={gs.textInput}
                      placeholder="Enter new password"
                      onChangeText={text =>
                        handleChangeFormPwd(text, 'newPassword')
                      }
                      secureTextEntry={isNewPwdShown ? false : true}
                    />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        right: 0,
                        height: '100%',
                        paddingHorizontal: 12,
                        justifyContent: 'center',
                      }}
                      onPress={() => setIsNewPwdShown(!isNewPwdShown)}>
                      {isNewPwdShown ? (
                        <Icon name="eye-off" size={18} />
                      ) : (
                        <Icon name="eye" size={18} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={gs.inputGroup}>
                  <Text style={gs.label}>Confirm Password</Text>
                  <View style={{position: 'relative'}}>
                    <TextInput
                      style={gs.textInput}
                      placeholder="Confirm your new password"
                      onChangeText={text =>
                        handleChangeFormPwd(text, 'confirmPassword')
                      }
                      secureTextEntry={isConfirmPwdShown ? false : true}
                    />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        right: 0,
                        height: '100%',
                        paddingHorizontal: 12,
                        justifyContent: 'center',
                      }}
                      onPress={() => setIsConfirmPwdShown(!isConfirmPwdShown)}>
                      {isConfirmPwdShown ? (
                        <Icon name="eye-off" size={18} />
                      ) : (
                        <Icon name="eye" size={18} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  style={{...gs.btnPrimary, marginTop: 8, marginBottom: 4}}
                  activeOpacity={0.8}
                  onPress={handleUpdatePwd}>
                  {isLoading ? (
                    <ActivityIndicator size="small" color={v.color.white} />
                  ) : (
                    <Text style={gs.btnPrimaryText}>Save Changes</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...gs.btnOutlinePrimary,
                    marginTop: 8,
                    marginBottom: 0,
                  }}
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

  function HistoryRoute() {
    const user = useSelector(state => state.user.data);

    const [bookingList, setBookingList] = useState([]);

    useEffect(() => {
      getBookingList();
    }, []);

    const getBookingList = async () => {
      try {
        const result = await axios.get(`booking/user/${user.id}`);
        setBookingList(result.data.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    const handleOpenTicket = id => {
      props.navigation.navigate('Ticket', {orderId: id});
    };

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: v.color.background}}>
        <View
          style={{
            ...gs.container,
            backgroundColor: 'transparent',
          }}>
          {bookingList.map(booking => (
            <View key={booking.id}>
              <BookingCard data={booking} handleOpenTicket={handleOpenTicket} />
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }

  const renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case 'profile':
        return <ProfileRoute jumpTo={jumpTo} />;
      case 'history':
        return <HistoryRoute jumpTo={jumpTo} />;
    }
  };

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
