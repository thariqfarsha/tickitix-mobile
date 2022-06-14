import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosApiInstance = axios.create({
  baseURL: 'https://tickitix.herokuapp.com/',
});

// Add a request interceptor
axiosApiInstance.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    const token = await AsyncStorage.getItem('token');
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosApiInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    const refreshToken = await AsyncStorage.getItem('refreshToken');

    if (error.response === 403) {
      if (error.response.data.msg === 'jwt expired') {
        axiosApiInstance
          .post('auth/refresh', {refreshToken})
          .then(async res => {
            await AsyncStorage.setItem('token', res.data.data.token);
            await AsyncStorage.setItem(
              'refreshToken',
              res.data.data.refreshToken,
            );
          })
          .catch(async () => {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('refreshToken');
          });
      } else {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('refreshToken');
      }
    }

    return Promise.reject(error);
  },
);

export default axiosApiInstance;
