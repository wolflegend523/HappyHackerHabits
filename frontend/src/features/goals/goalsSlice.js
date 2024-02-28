import { createSlice } from '@reduxjs/toolkit';
import { createGoal, readGoals, readGoal, updateGoal, removeGoal } from './goalsActions';

const initialState = {
  goals: [],
  loading: false,
  error: null,
  success: null,
};

const goalSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
    clearGoals: (state) => {
      state.goals = [];
    },
  },
  extraReducers: (builder) => {
    // Create goal
    builder.addCase(createGoal.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    });
    builder.addCase(createGoal.fulfilled, (state, action) => {
      state.goals.push(action.payload);
      state.loading = false;
      state.error = null;
      state.success = 'Goal Created';
    });
    builder.addCase(createGoal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.success = null;
    });
    // Read goals
    builder.addCase(readGoals.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    });
    builder.addCase(readGoals.fulfilled, (state, action) => {
      state.goals = action.payload;
      state.loading = false;
      state.error = null;
      state.success = 'Goals Read';
    });
    builder.addCase(readGoals.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.success = null;
    });
    // Read goal
    builder.addCase(readGoal.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    });
    builder.addCase(readGoal.fulfilled, (state, action) => {
      // if the goal is already in the state replace it with the new one
      if (state.goals.includes(action.meta.arg.goalId)) {
        state.goals = state.goals.map((goal) => {
          if (goal._id === action.meta.arg.goalId) {
            return action.payload;
          }
          return goal;
        });
      }
      // if it is not in the state add it
      else {
        state.goals.push(action.payload);
      }
      state.loading = false;
      state.error = null;
      state.success = 'Goal Read';
    });
    builder.addCase(readGoal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.success = null;
    });
    // Update goal
    builder.addCase(updateGoal.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    });
    builder.addCase(updateGoal.fulfilled, (state, action) => {
      state.goals = state.goals.map((goal) => {
        if (goal.goalId === parseInt(action.meta.arg.goalId)) {
          return action.payload;
        }
        return goal;
      });
      state.loading = false;
      state.error = null;
      state.success = 'Goal Updated';
    });
    builder.addCase(updateGoal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.success = null;
    });
    // Remove goal
    builder.addCase(removeGoal.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    });
    builder.addCase(removeGoal.fulfilled, (state, action) => {
      state.goals = state.goals.filter((goal) => goal.goalId !== parseInt(action.meta.arg.goalId));
      state.loading = false;
      state.error = null;
      state.success = 'Goal Removed';
    });
    builder.addCase(removeGoal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.success = null;
    });
  }
});

export const { resetStatus, clearGoals } = goalSlice.actions;

export default goalSlice.reducer;
