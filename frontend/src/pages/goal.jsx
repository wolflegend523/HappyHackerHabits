// import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateGoal, removeGoal } from '../features/goals/goalsActions';

const Goal = () => {
  // helper function to find a goal by its id
  // TODO: This probably should be moved to a helper file
  const findGoal = (goalId, goalsArray) => {
    for (let i = 0; i < goalsArray.length; i++) {
      if (goalsArray[i].goalId === parseInt(goalId)) {
        return goalsArray[i];
      }
    }
  }

  const { goalId } = useParams();
  const { goals } = useSelector((state) => state.goals);
  const goal = findGoal(goalId, goals);
  const token = useSelector((state) => state.user.userToken);
  // const [goalName, setGoalName] = useState(goal.goalName);
  // const [goalDescription, setGoalDescription] = useState(goal.goalDescription);

  const dispatch = useDispatch();

  const handleUpdateGoal = () => {
    // dispatch(updateGoal({goalId, name: goalName, description: goalDescription}));
  }

  const handleDeployGoal = () => {
    dispatch(updateGoal({token, goalId, deployedAt: new Date()}));
  }

  const handleRemoveGoal = () => {
    dispatch(removeGoal({token, goalId}));
  }

  return (
    <div>
      <h1>{goal && goal.goalName}</h1>
      <p>{goal && goal.goalDescription}</p>
      
      {goal && <button onClick={handleUpdateGoal}>Update Goal</button>}
      {goal && <button onClick={handleDeployGoal}>Deploy Goal</button>}
      {goal && <button onClick={handleRemoveGoal}>Delete Goal</button>}
    </div>
  );
}

export default Goal;