import { combineReducers } from '@reduxjs/toolkit';
import snackbarReducer from './snackbar';
import departmentReducer from './department'
import groupReducer from './group'
import confirmationReducer from './confirm'
import complianceReducer from './compliance'
import formReducer from './form'
import userReducer from './user'
import loadingReducer from './loading'

const rootReducer = combineReducers({
  snackbar: snackbarReducer,
  department: departmentReducer,
  group: groupReducer,
  confirmation: confirmationReducer,
  compliance: complianceReducer,
  form: formReducer,
  user: userReducer,
  globalLoading: loadingReducer,
});

export default rootReducer;
