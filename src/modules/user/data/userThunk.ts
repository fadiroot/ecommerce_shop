/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../shared/utils/axios';
import { userPayload } from './userTypes';

const fakeFetchUsers = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return fake user data
  return [
    {
      id: '1',
      name: 'test',
      city: 'Tunis',
      role: 'admin',
      email: 'test@gmail.com',
      state: 'sousse',
      status: 'banned',
      address: 'sousse',
      country: 'Tunis',
      zipCode: '4013',
      company: 'softyline',
      avatarUrl: null,
      phoneNumber: '12345678',
      isVerified: true,
    },
    {
      id: '2',
      name: 'test 2',
      city: 'Tunis',
      role: 'admin',
      email: 'test2@gmail.com',
      state: 'sousse',
      status: 'active',
      address: 'sousse',
      country: 'Tunis',
      zipCode: '4013',
      company: 'softyline',
      avatarUrl: null,
      phoneNumber: '12345678',
      isVerified: true,
    },
    {
      id: '3',
      name: 'test 3',
      city: 'Tunis',
      role: 'admin',
      email: 'test3@gmail.com',
      state: 'sousse',
      status: 'active',
      address: 'sousse',
      country: 'Tunis',
      zipCode: '4013',
      company: 'softyline',
      avatarUrl: null,
      phoneNumber: '12345678',
      isVerified: true,
    },
    {
      id: '4',
      name: 'test',
      city: 'Tunis',
      role: 'admin',
      email: 'test@gmail.com',
      state: 'sousse',
      status: 'active',
      address: 'sousse',
      country: 'Tunis',
      zipCode: '4013',
      company: 'softyline',
      avatarUrl: null,
      phoneNumber: '12345678',
      isVerified: true,
    },
    {
      id: '45',
      name: 'test 852',
      city: 'Tunis',
      role: 'admin',
      email: 'tes456@gmail.com',
      state: 'sousse',
      status: 'active',
      address: 'sousse',
      country: 'Tunis',
      zipCode: '4013',
      company: 'softyline',
      avatarUrl: null,
      phoneNumber: '12345678',
      isVerified: true,
    },
  ];
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const users = await fakeFetchUsers();
  return users;
});

export const deleteUsers = createAsyncThunk('users/deleteUsers', async (ids, thunkAPI) => {
  let data;
  try {
    const response = await axiosInstance.delete(`/api/users/`, {
      data: { ids },
    });
    data = await response.data;
    if (response.status === 200) {
      return { data, status: 'success' };
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject({
      message: err.message ? err.message : data?.message,
    });
  }
});
export const fetchOneUser = createAsyncThunk('users/fetchOneUser', async (id: string, thunkAPI) => {
  let data;
  try {
    const response = await axiosInstance.get(`/api/users/${id}`);
    data = await response.data;
    if (response.status === 200) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});
export const createUser = createAsyncThunk(
  'users/createUser',
  async (payload: userPayload, thunkAPI) => {
    let data;
    try {
      const response = await axiosInstance.post(`/api/users/`, payload);
      data = await response.data;
      if (response.status === 200) {
        return data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);
