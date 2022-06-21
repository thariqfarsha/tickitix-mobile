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
