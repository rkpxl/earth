import { combineReducers } from '@reduxjs/toolkit';
import snackbarReducer from './snackbar';
import departmentReducer from './department'
import groupReducer from './group'
import confirmationReducer from './confirm'

const rootReducer = combineReducers({
  snackbar: snackbarReducer,
  department: departmentReducer,
  group: groupReducer,
  confirmation: confirmationReducer,
});

export default rootReducer;
