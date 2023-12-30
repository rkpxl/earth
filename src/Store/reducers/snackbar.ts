// reducers/snackbar.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as type from '../../Utils/types/type'

const initialState: type.Snackbar = {
    message: null,
    duration: 3000, // Default duration in milliseconds
    severity: 'warning',
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showMessage: (state, action: PayloadAction<{ message: string; duration?: number; severity?: type.Snackbar_Severity}>) => {
        console.log("inside showmessage")
      const { message, duration = initialState.duration, severity = initialState.severity } = action.payload;
      return { ...state, message, duration, severity };
    },
    hideMessage: (state) => {
      return { ...state, message: null };
    },
  },
});

export const { showMessage, hideMessage } = snackbarSlice.actions;
export default snackbarSlice.reducer;
