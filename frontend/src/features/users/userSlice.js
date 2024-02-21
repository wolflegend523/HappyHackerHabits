import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser } from './userActions';

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
  reducers: {},
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
      state.error = action.error.message;
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
      state.success = action.payload.profile.display_name + ' Logged In';
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.success = null;
    });
  }
});

export default userSlice.reducer;