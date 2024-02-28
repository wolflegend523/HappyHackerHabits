import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, unregisterUser } from './userActions';

const initialState = {
  userEmail: '',
  userProfile: {},
  userToken: '',
  userIsLoggedIn: false,
  loading: false,
  error: null,
  success: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // logout user
    logoutUser: (state) => {
      state.userEmail = '';
      state.userProfile = {};
      state.userToken = '';
      state.userIsLoggedIn = false;
      state.loading = false;
      state.error = null;
      state.success = 'User Logged Out';
    },
    resetStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    }
  },
  extraReducers: (builder) => {
    // Register user
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.success = 'User Registered';
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = null;
    });
    // Login user
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userEmail = action.payload.email;
      state.userProfile = action.payload.profile;
      state.userToken = action.payload.token;
      state.userIsLoggedIn = true;
      state.error = null;
      state.success = action.payload.profile.displayName + ' Logged In';
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = null;
    });
    // unregister user
    builder.addCase(unregisterUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    });
    builder.addCase(unregisterUser.fulfilled, (state) => {
      state.loading = false;
      state.userEmail = '';
      state.userProfile = {};
      state.userToken = '';
      state.userIsLoggedIn = false;
      state.error = null;
      state.success = 'User Unregistered';
    });
    builder.addCase(unregisterUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = null;
    });
  }
});

export const { logoutUser, resetStatus } = userSlice.actions;

export default userSlice.reducer;