import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConfirmationState } from '../../Utils/types/type';


const initialState: ConfirmationState<any[]> = {
  isOpen: false,
  title: 'Confirmation',
  args: null,
};

const confirmationSlice = createSlice({
  name: 'confirmation',
  initialState,
  reducers: {
    openConfirmation: (state, action: PayloadAction<{ title?: string, args: any }>) => {
      state.isOpen = true;
      state.title = action.payload?.title || 'Confirmation';
      state.args = action.payload.args;
    },
    closeConfirmation: (state) => {
      state.args = null,
      state.isOpen = false;
      state.title = 'Confirmation';
    },
  },
});

export const { openConfirmation, closeConfirmation } = confirmationSlice.actions;
export default confirmationSlice.reducer;
