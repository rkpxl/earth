import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as type from '../../Utils/types/type'
import { string } from 'prop-types';



const initialState : type.IUser = {
  _id: '',
  email: '',
  type: '',
  accessLevel: '',
  name: '',
  secondaryDepartmentsId: [],
  orgId: 0,
  isActive: false,
  createdBy: '',
  createdAt: '',
  updatedAt: '',
  primaryDepartmentId: 0,
  __v: 0
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<{ payload: Partial<type.IUser>}>) => {
      return { ...state, ...action.payload };
    },
  }
})

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;