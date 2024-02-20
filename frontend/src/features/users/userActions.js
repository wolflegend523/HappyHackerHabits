import { createAsyncThunk } from '@reduxjs/toolkit'
import { postUser, postUserLogin } from './userApi'

const registerUser = createAsyncThunk(
  'user/registerUser', async ({email, displayName, password}, { rejectWithValue }) => {
    const response = await postUser(email, displayName, password)
    if (!response.ok) {
      return rejectWithValue('Registration failed');
    }
    const data = await response.json()
    return data
  }
);

const loginUser = createAsyncThunk(
  'user/loginUser', async ({ email, password }, { rejectWithValue }) => {
    const response = await postUserLogin(email, password)
    if (!response.ok) {
      return rejectWithValue('Login failed');
    }
    const data = await response.json();
    return data;
  }
);

export { registerUser, loginUser };