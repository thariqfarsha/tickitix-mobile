import axios from '../../utils/axios';

export const getUserById = userId => {
  return {
    type: 'GET_USER_BY_ID',
    payload: axios.get(`user/${userId}`),
  };
};

export const logout = refreshToken => {
  return {
    type: 'LOGOUT',
    payload: axios.post('auth/logout', {refreshToken}),
  };
};

export const updateProfile = (userId, formProfile) => {
  return {
    type: 'UPDATE_PROFILE',
    payload: axios.patch(`user/profile/${userId}`, formProfile),
  };
};

export const updatePwd = (userId, formPwd) => {
  return {
    type: 'UPDATE_PWD',
    payload: axios.patch(`user/password/${userId}`, formPwd),
  };
};

export const registration = form => {
  return {
    type: 'REGISTRATION',
    payload: axios.post('auth/register', form),
  };
};
