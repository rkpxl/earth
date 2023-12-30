import { combineReducers } from '@reduxjs/toolkit';
import snackbarReducer from './snackbar';
import departmentReducer from './department'
import groupReducer from './group'

const rootReducer = combineReducers({
  snackbar: snackbarReducer,
  department: departmentReducer,
  group: groupReducer,
});

export default rootReducer;
