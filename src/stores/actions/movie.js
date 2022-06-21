import axios from '../../utils/axios';

export const getAllMovies = (
  page = 1,
  limit = 6,
  search,
  sort = 'name asc',
  month,
) => {
  return {
    type: 'GET_ALL_MOVIES',
    payload: axios.get(
      `movie?page=${page}&limit=${limit}&searchName=${search}&sort=${sort}&searchRelease=${month}`,
    ),
  };
};
