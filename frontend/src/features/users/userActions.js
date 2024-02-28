import { createAsyncThunk } from '@reduxjs/toolkit'
import { postUser, postUserLogin, deleteUser } from './userApi'

const registerUser = createAsyncThunk(
  'user/registerUser', async ({email, displayName, password}, { rejectWithValue }) => {
    const response = await postUser(email, displayName, password)
    if (!response.ok) {
      try {
        const data = await response.json();
        return rejectWithValue(data.error);
      } catch (error) {
        return rejectWithValue('Registration failed');
      }
    }
    return;
  }
);

const loginUser = createAsyncThunk(
  'user/loginUser', async ({ email, password }, { rejectWithValue }) => {
    const response = await postUserLogin(email, password)
    if (!response.ok) {
      try {
        const data = await response.json();
        return rejectWithValue(data.error);
      } catch (error) {
        return rejectWithValue('Login failed');
      }
    }
    const data = await response.json();
    return data;
  }
);

const unregisterUser = createAsyncThunk(
  'user/unregisterUser', async ({token}, { rejectWithValue }) => {
    const response = await deleteUser(token);
    if (!response.ok) {
      try {
        const data = await response.json();
        return rejectWithValue(data.error);
      } catch (error) {
        return rejectWithValue('Unregister failed');
      }
    }
    return;
  }
);

export { registerUser, loginUser, unregisterUser };