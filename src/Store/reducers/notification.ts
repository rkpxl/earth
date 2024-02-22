import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  total: 0,
  data: [],
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    updateNotificationData: (state, action: PayloadAction<{ total?: any, data?: any }>) => {
      state.data = action.payload?.data || []
      state.total = action?.payload?.total || state?.total || 0
    },
    updateNotificationDataOnly: (state, action: PayloadAction<{ data: any }>) => {
      state.data = action.payload.data
    },
  },
})

export const { updateNotificationData, updateNotificationDataOnly } = notificationSlice.actions
export default notificationSlice.reducer
