// reducers/snackbar.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as type from '../../Utils/types/type'
import axiosInstance from '../../Utils/axiosUtil';
import { ICompliance } from '../../Utils/types/type';
import { Page } from '../../Utils/constants';



interface ComplianceState {
  data: ICompliance[] | undefined;
  loading: boolean;
  error: string | null;
}
  
const initialState: ComplianceState = {
  data: undefined,
  loading: false,
  error: null,
};

export const fetchCompliances = createAsyncThunk('compliance/fetchCompliances', async (params?: any) => {
  const { page = Page.defaultPage, pageSize = Page.defaultPageSize } = params;
  try {
    const response: type.APIResponse<Array<ICompliance>> = await axiosInstance.get('/compliance', {
      params: {
        page: page,
        pageSize: pageSize,
      },
    });
    return response.data;
  } catch (error) {
    throw error || 'Error fetching compliances';
  }
});
const complianceSlice = createSlice({
  name: 'compliance',
  initialState,
  reducers: {
    clearCompliances: (state) => {
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
    // Handling the pending, fulfilled, and rejected states of fetchCompliances
    builder.addCase(fetchCompliances.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchCompliances.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    });

    builder.addCase(fetchCompliances.rejected, (state, action) => {
      state.loading = false;
      state.error = 'Error fetching compliances';
    });
  },
});

export default complianceSlice.reducer;

// Exporting the synchronous actions
export const { clearCompliances, setLoading, setError } = complianceSlice.actions;