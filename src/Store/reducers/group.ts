// reducers/snackbar.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as type from '../../Utils/types/type'
import axiosInstance from '../../Utils/axiosUtil';
import { IGroup } from '../../Utils/types/type';
import { Page } from '../../Utils/constants';



interface GroupState {
  data: IGroup[] | undefined;
  loading: boolean;
  error: string | null;
}
  
const initialState: GroupState = {
  data: undefined,
  loading: false,
  error: null,
};

interface FetchGroupsParams {
  page: number;
  pageSize: number;
}

export const fetchGroups = createAsyncThunk('group/fetchGroups', async (params?: any) => {
  try {
    const { page = Page.defaultPage, pageSize = Page.defaultPageSize } = params;
    const response: type.APIResponse<Array<IGroup>> = await axiosInstance.get('/group', {
      params: {
        page: page,
        pageSize: pageSize,
      },
    });
    return response.data;
  } catch (error) {
    throw error || 'Error fetching groups';
  }
});


const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    clearGroups: (state) => {
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
    // Handling the pending, fulfilled, and rejected states of fetchGroups
    builder.addCase(fetchGroups.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchGroups.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    });

    builder.addCase(fetchGroups.rejected, (state, action) => {
      state.loading = false;
      state.error = 'Error fetching groups';
    });
  },
});

export default groupSlice.reducer;

// Exporting the synchronous actions
export const { clearGroups, setLoading, setError } = groupSlice.actions;