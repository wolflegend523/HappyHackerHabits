import { createAsyncThunk } from '@reduxjs/toolkit'
import { postGoal, getGoals, getGoal, putGoal, deleteGoal } from './goalsApi'


const createGoal = createAsyncThunk(
  'goal/createGoal', async ({token, name, description}, { rejectWithValue }) => {
    const response = await postGoal(token, name, description);
    if (!response.ok) {
      return rejectWithValue('Create goal failed');
    }
    const data = await response.json();
    return data;
  }
);


const readGoals = createAsyncThunk(
  'goal/readGoals', async ({token}, { rejectWithValue }) => {
    const response = await getGoals(token);
    if (!response.ok) {
      return rejectWithValue('Read goals failed');
    }
    const data = await response.json();
    return data;
  }
);


const readGoal = createAsyncThunk(
  'goal/readGoal', async ({token, goalId}, { rejectWithValue }) => {
    const response = await getGoal(token, goalId);
    if (!response.ok) {
      return rejectWithValue('Read goal failed');
    }
    const data = await response.json();
    return data;
  }
);


const updateGoal = createAsyncThunk(
  'goal/updateGoal', async ({token, goalId, name, description, deployedAt}, { rejectWithValue }) => {
    const response = await putGoal(token, goalId, name, description, deployedAt);
    if (!response.ok) {
      return rejectWithValue('Update goal failed');
    }
    const data = await response.json();
    return data;
  }
);


const removeGoal = createAsyncThunk(
  'goal/removeGoal', async ({token, goalId}, { rejectWithValue }) => {
    const response = await deleteGoal(token, goalId);
    if (!response.ok) {
      return rejectWithValue('Remove goal failed');
    }
    return;
  }
);

export { createGoal, readGoals, readGoal, updateGoal, removeGoal };