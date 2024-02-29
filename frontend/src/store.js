import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/users/userSlice';
import goalReducer from './features/goals/goalsSlice';

/* Holds all the redux state for the application */
// all the slices/reducers are combined here and the store is created
const store = configureStore({
  reducer: {
    user: userReducer,
    goals: goalReducer,
  },
});

export default store;