import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  answers: any;
}

const initialState: FormState = {
  answers: {},
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    initiatState: () => {
      return initialState;
    },
    updateAnswer: (
      state,
      action: PayloadAction<{ tabIndex: number; id: string; answer: any }>
    ) => {
      const { tabIndex, id, answer } = action.payload;
      state.answers = {
        ...state.answers,
        [tabIndex]: {
          ...state.answers[tabIndex],
          [id]: answer,
        },
      };
    },
  },
});

export default formSlice.reducer;

// Exporting the synchronous actions
export const { updateAnswer } = formSlice.actions;
