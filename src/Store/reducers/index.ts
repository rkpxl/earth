import { combineReducers } from '@reduxjs/toolkit';
import snackbarReducer from './snackbar';

const rootReducer = combineReducers({
  snackbar: snackbarReducer,
});

export default rootReducer;
