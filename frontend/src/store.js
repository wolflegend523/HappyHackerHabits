import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/users/userSlice';
import goalReducer from './features/goals/goalsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    goals: goalReducer,
  },
});

export default store;