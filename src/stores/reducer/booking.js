const initialState = {
  isLoading: false,
  isError: false,
  data: {},
  msg: '',
};

const booking = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_DATA_BOOKING': {
      return {
        ...state,
        data: action.data,
      };
    }
    case 'UPDATE_DATA_BOOKING': {
      return {
        ...state,
        data: {...state.data, ...action.data},
      };
    }
    case 'CREATE_BOOKING_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case 'CREATE_BOOKING_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    }
    case 'CREATE_BOOKING_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    }
    default: {
      return state;
    }
  }
};

export default booking;
