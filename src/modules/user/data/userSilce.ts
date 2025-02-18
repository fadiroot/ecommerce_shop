/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsers, fetchOneUser } from './userThunk';

export interface AuthState {
  status: string;
  users: [] | null;
  error: string | null;
  user: {
    name: string | null;
    city: string | null;
    role: string | null;
    email: string | null;
    state: string | null;
    status: string | null;
    address: string | null;
    country: string | null;
    zipCode: string | null;
    company: string | null;
    avatarUrl: string | null;
    phoneNumber: string | null;
    isVerified: boolean | null;
  } | null;
}

const initialState: AuthState = {
  status: 'idle',
  users: [],
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initialise: (state, action) => {
      state.users = [];
    },
    restoreUser: (state) => {
      state.user = initialState.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<any>) => {
      state.users = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(fetchUsers.rejected, (state, action: PayloadAction<any>) => {
      state.error = action?.payload;
      state.status = 'failed';
    });

    builder.addCase(fetchOneUser.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchOneUser.fulfilled, (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(fetchOneUser.rejected, (state, action: PayloadAction<any>) => {
      state.error = action?.payload;
      state.status = 'failed';
    });
  },
});

export const { initialise, restoreUser } = userSlice.actions;

export default userSlice.reducer;
