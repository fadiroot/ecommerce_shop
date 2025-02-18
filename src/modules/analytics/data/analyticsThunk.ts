import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../shared/utils/axios';

export const fetchStatsData = createAsyncThunk('analytics/getStatsData', async (thunkAPI) => {
  let data;
  try {
    const response = await axiosInstance.get(`/api/stats/`);
    data = await response.data;
    if (response.status === 200) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});
