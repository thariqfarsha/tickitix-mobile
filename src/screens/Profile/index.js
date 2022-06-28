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
  Modal,
  Pressable,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import BookingCard from '../../components/BookingCard';
import HLine from '../../components/HLine';
import {
  getUserById,
  logout,
  updateProfile,
  updatePwd,
} from '../../stores/actions/user';
import gs from '../../styles/globalStyles';
import v from '../../styles/styleVariables';
import axios from '../../utils/axios';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

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
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [isUpload, setIsUpload] = useState(false);

    const handleLaunchCamera = async () => {
      try {
        setIsUpload(true);
        setModalVisible(!modalVisible);
        const photo = await launchCamera({
          mediaType: 'photo',
          maxWidth: 100,
          quality: 0.2,
          cameraType: 'front',
        });
        const formData = new FormData();
        formData.append('image', {
          name: photo.assets[0].fileName,
          type: photo.assets[0].type,
          uri: photo.assets[0].uri,
        });
        const result = await axios.patch(`user/image/${user.id}`, formData);
        await dispatch(getUserById(user.id));
        setIsUpload(false);
        setIsUpload(false);
        ToastAndroid.showWithGravity(
          `${result.data.msg}`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      } catch (error) {
        console.log(error.response.data);
        setIsUpload(false);
        ToastAndroid.showWithGravity(
          `${error.response.data.msg}`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
    };

    const handleLaunchImageLibrary = async () => {
      try {
        setModalVisible(!modalVisible);
        const photo = await launchImageLibrary({
          mediaType: 'photo',
          maxWidth: 100,
        });
        setIsUpload(true);
        const formData = new FormData();
        formData.append('image', {
          name: photo.assets[0].fileName,
          type: photo.assets[0].type,
          uri: photo.assets[0].uri,
        });
        const result = await axios.patch(`user/image/${user.id}`, formData);
        await dispatch(getUserById(user.id));
        setIsUpload(false);
        ToastAndroid.showWithGravity(
          `${result.data.msg}`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      } catch (error) {
        console.log(error.response.data);
        setIsUpload(false);
        ToastAndroid.showWithGravity(
          `${error.response.data.msg}`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
    };

    const handleDeleteImage = () => {
      setModalVisible(!modalVisible);
      setConfirmModalVisible(true);
    };

    const handleConfirmDeleteImage = async () => {
      try {
        setIsUpload(true);
        setConfirmModalVisible(false);
        const result = await axios
          .delete(`user/image/${user.id}`)
          .then(setIsUpload(false));
        ToastAndroid.showWithGravity(
          `${result.data.msg}`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
        await dispatch(getUserById(user.id));
      } catch (error) {
        console.log(error);
        setIsUpload(false);
        ToastAndroid.showWithGravity(
          `${error.response.data.msg}`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
    };

    const handleLogout = async () => {
      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        await dispatch(logout(refreshToken));
        await AsyncStorage.clear();
        props.navigation.navigate('AuthScreen', {
          screen: 'Login',
        });
        ToastAndroid.showWithGravity(
          'Logged out',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
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

    const profilePicture = {
      uri: user.imagePath
        ? user.imagePath
        : `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random&size=192`,
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
            <TouchableOpacity
              style={{position: 'relative'}}
              activeOpacity={0.8}
              onPress={() => setModalVisible(true)}>
              <Image
                source={profilePicture}
                style={{
                  height: 100,
                  width: 100,
                  resizeMode: 'cover',
                  borderRadius: 100,
                  marginBottom: 28,
                }}
              />
              <View
                style={{
                  backgroundColor: v.color.white,
                  elevation: 2,
                  borderRadius: 100,
                  width: 24,
                  height: 24,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  right: 4,
                  bottom: 32,
                }}>
                <Icon name="edit-2" color={v.color.body} size={12} />
              </View>
              {(isUpload || isLoading) && (
                <ActivityIndicator
                  size="large"
                  color={v.color.primary}
                  style={{position: 'absolute', top: 33, left: 33}}
                />
              )}
            </TouchableOpacity>
            {/* Modal Choose Photo*/}
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <Pressable
                style={{
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                }}
                onPress={() => setModalVisible(false)}>
                <View
                  style={{
                    margin: 20,
                    backgroundColor: 'white',
                    borderRadius: 12,
                    alignItems: 'flex-start',
                    shadowColor: '#000',
                    elevation: 5,
                    paddingVertical: 16,
                    width: '60%',
                  }}>
                  <Text
                    style={{
                      ...gs.h5,
                      paddingVertical: 8,
                      textAlign: 'center',
                      width: '100%',
                    }}>
                    Choose picture
                  </Text>
                  <Pressable
                    style={{
                      paddingVertical: 12,
                      paddingHorizontal: 24,
                      borderRadius: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '100%',
                    }}
                    android_ripple={{color: v.color.line}}
                    onPress={handleLaunchCamera}>
                    <Icon name="camera" size={16} />
                    <Text
                      style={{
                        ...gs.p,
                        marginBottom: 0,
                        marginStart: 8,
                      }}>
                      Take picture using camera
                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      paddingVertical: 12,
                      paddingHorizontal: 24,
                      borderRadius: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '100%',
                    }}
                    android_ripple={{color: v.color.line}}
                    onPress={handleLaunchImageLibrary}>
                    <Icon name="image" size={16} />
                    <Text
                      style={{
                        ...gs.p,
                        marginBottom: 0,
                        marginStart: 8,
                      }}>
                      Pick from gallery
                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      paddingVertical: 12,
                      paddingHorizontal: 24,
                      borderRadius: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '100%',
                      opacity: user.imagePath ? 1 : 0.5,
                    }}
                    android_ripple={{color: v.color.line}}
                    onPress={handleDeleteImage}
                    disabled={user.imagePath ? false : true}>
                    <Icon name="trash-2" size={16} color={v.color.error} />
                    <Text
                      style={{
                        ...gs.p,
                        marginBottom: 0,
                        marginStart: 8,
                        color: v.color.error,
                      }}>
                      Delete picture
                    </Text>
                  </Pressable>
                </View>
              </Pressable>
            </Modal>
            {/* Modal Confirm Deletion */}
            <Modal
              animationType="fade"
              transparent={true}
              visible={confirmModalVisible}
              onRequestClose={() => {
                setConfirmModalVisible(!confirmModalVisible);
              }}>
              <Pressable
                style={{
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                }}
                onPress={() => setConfirmModalVisible(false)}>
                <View
                  style={{
                    margin: 20,
                    backgroundColor: 'white',
                    borderRadius: 12,
                    alignItems: 'flex-start',
                    shadowColor: '#000',
                    elevation: 5,
                    padding: 16,
                    width: '60%',
                  }}>
                  <Text
                    style={{
                      ...gs.h5,
                      paddingVertical: 8,
                      textAlign: 'center',
                      width: '100%',
                    }}>
                    Confirm Deletion
                  </Text>
                  <Text
                    style={{
                      ...gs.p,
                      paddingVertical: 8,
                      textAlign: 'center',
                      width: '100%',
                    }}>
                    Are you sure to delete your profile picture?
                  </Text>
                  <View style={{flexDirection: 'row', width: '100%'}}>
                    <Pressable
                      style={{
                        paddingVertical: 12,
                        paddingHorizontal: 24,
                        borderRadius: 12,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',

                        flex: 1,
                      }}
                      android_ripple={{color: v.color.line}}
                      onPress={() => setConfirmModalVisible(false)}>
                      <Text
                        style={{
                          ...gs.p,
                          marginBottom: 0,
                        }}>
                        Cancel
                      </Text>
                    </Pressable>
                    <Pressable
                      style={{
                        paddingVertical: 12,
                        paddingHorizontal: 24,
                        borderRadius: 12,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                      }}
                      android_ripple={{color: v.color.line}}
                      onPress={handleConfirmDeleteImage}>
                      <Text
                        style={{
                          ...gs.p,
                          marginBottom: 0,
                          color: v.color.error,
                        }}>
                        Delete
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </Pressable>
            </Modal>
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

      return () => {
        setBookingList({});
      };
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
