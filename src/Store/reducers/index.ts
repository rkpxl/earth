import { combineReducers } from '@reduxjs/toolkit';
import snackbarReducer from './snackbar';
import departmentReducer from './department'
import groupReducer from './group'
import confirmationReducer from './confirm'
import complianceReducer from './compliance'

const rootReducer = combineReducers({
  snackbar: snackbarReducer,
  department: departmentReducer,
  group: groupReducer,
  confirmation: confirmationReducer,
  compliance: complianceReducer,
});

export default rootReducer;
