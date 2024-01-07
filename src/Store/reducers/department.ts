// reducers/snackbar.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as type from '../../Utils/types/type'
import { AnyARecord } from 'dns';
import axiosInstance from '../../Utils/axiosUtil';
import { IDepartment } from '../../Utils/types/type';



interface DepartmentState {
  data: IDepartment[] | undefined;
  loading: boolean;
  error: string | null;
}
  
const initialState: DepartmentState = {
  data: undefined,
  loading: false,
  error: null,
};

export const fetchDepartments = createAsyncThunk('department/fetchDepartments', async () => {
  try {
    const response: type.APIResponse<Array<IDepartment>> = await axiosInstance.get('/department');
    return response.data;
  } catch (error) {
    throw error || 'Error fetching departments';
  }
});

const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    clearDepartments: (state) => {
      state.data = undefined;
      state.loading = false;
      state.error = null;
    },

    // Action to set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // Action to set error state
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handling the pending, fulfilled, and rejected states of fetchDepartments
    builder.addCase(fetchDepartments.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchDepartments.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    });

    builder.addCase(fetchDepartments.rejected, (state, action) => {
      state.loading = false;
      state.error = 'Error fetching departments';
    });
  },
});

export default departmentSlice.reducer;

// Exporting the synchronous actions
export const { clearDepartments, setLoading, setError } = departmentSlice.actions;