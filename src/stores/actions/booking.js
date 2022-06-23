import axios from '../../utils/axios';

export const createDataBooking = dataBooking => {
  return {
    type: 'CREATE_DATA_BOOKING',
    data: dataBooking,
  };
};

export const updateDataBooking = dataBooking => {
  return {
    type: 'UPDATE_DATA_BOOKING',
    data: dataBooking,
  };
};

export const createBooking = formBooking => {
  return {
    type: 'CREATE_BOOKING',
    payload: axios.post('booking', formBooking),
  };
};
