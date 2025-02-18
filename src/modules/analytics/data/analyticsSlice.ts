/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchStatsData } from './analyticsThunk';

export interface AnalyticsState {
  status: string;
  stats: [] | null;
  error: string | null;
}

const initialState: AnalyticsState = {
  status: 'idle',
  stats: [],
  error: null,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    initialise: (state, action) => {
      state.stats = [];
    },
    restoreStats: (state) => {
      state.stats = initialState.stats;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStatsData.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchStatsData.fulfilled, (state, action: PayloadAction<any>) => {
      state.stats = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(fetchStatsData.rejected, (state, action: PayloadAction<any>) => {
      state.error = action?.payload;
      state.status = 'failed';
    });
  },
});

export const { initialise, restoreStats } = analyticsSlice.actions;

export default analyticsSlice.reducer;
