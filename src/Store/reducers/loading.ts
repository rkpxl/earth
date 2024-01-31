// reducers/snackbar.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as type from '../../Utils/types/type'
import axiosInstance from '../../Utils/axiosUtil'

interface LoadingState {
  isLoading: boolean
}

const initialState: LoadingState = {
  isLoading: false,
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true
    },
    endLoading: (state) => {
      state.isLoading = false
    },
  },
})

export default loadingSlice.reducer

// Exporting the synchronous actions
export const { startLoading, endLoading } = loadingSlice.actions
