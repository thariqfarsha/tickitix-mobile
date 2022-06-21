import {combineReducers} from 'redux';

import user from './user';
import movie from './movie';
import booking from './booking';

export default combineReducers({
  user,
  movie,
  booking,
});
