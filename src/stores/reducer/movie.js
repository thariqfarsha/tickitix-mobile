const initialState = {
  isLoading: false,
  isError: false,
  data: [],
  pagination: {},
  msg: '',
};

const movie = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_MOVIES_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case 'GET_ALL_MOVIES_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        pagination: action.payload.data.pagination,
        msg: action.payload.data.msg,
      };
    }
    case 'GET_ALL_MOVIES_REJECTED': {
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

export default movie;
