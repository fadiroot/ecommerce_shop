import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '../../auth/data/authSlice';
import userReducer from '../../user/data/userSilce';
import analyticsReducer from '../../analytics/data/analyticsSlice';
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  analytics: analyticsReducer,
});

export default rootReducer;
