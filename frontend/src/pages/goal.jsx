import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateGoal, removeGoal } from '../features/goals/goalsActions';
import styles from '../styles/Pages.module.css';

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
  const [editMode, setEditMode] = useState(false);
  const [goalName, setGoalName] = useState(goal? goal.goalName : "");
  const [goalDescription, setGoalDescription] = useState(goal? goal.goalDescription: "");

  const dispatch = useDispatch();

  useEffect(() => {
    if (goal) {
      setGoalName(goal.goalName);
      setGoalDescription(goal.goalDescription);
      if (goal.goalDescription == null) {
        setGoalDescription("");
      }
      setEditMode(false);
    }
  }, [goal]);


  const handleUpdateGoal = () => {
    dispatch(updateGoal({token, goalId, name: goalName, description: goalDescription}));
  }

  const handleDeployGoal = () => {
    dispatch(updateGoal({token, goalId, deployedAt: new Date()}));
  }

  const handleRemoveGoal = () => {
    dispatch(removeGoal({token, goalId}));
  }

  return (
    <div className={styles.page}>
      {!editMode && 
        <>
          {goal && <h1>{goal.goalName}</h1>}
          {goal && <p>{goal.goalDescription}</p>}
          {goal && <p>Status: {goal.deployedAt ? <>deployed on {goal.deployedAt}</> : <>in progress</>}</p>}
          
          {goal && <button onClick={() => setEditMode(true)} className={styles.accent2}>Edit Goal</button>}
          {(goal && !goal.deployedAt) && <button onClick={handleDeployGoal} className={styles.accent3}>Deploy Goal</button>}
          {/* add a way to Undeploy a deployed goal */}
          {goal && <button onClick={handleRemoveGoal} className={styles.accent4}>Delete Goal</button>}
        </>
      }

      {editMode && 
      <>
        <h1>Update Goal "{goal && goal.goalName}"</h1>
        <div className={styles.floatColumnContainer}> 
          <div>
            <label htmlFor="goalName">Goal Name :</label>
            <input name="goalName" id="goalName" type="text" value={goal && goalName} onChange={(e) => setGoalName(e.target.value)} />
          </div>
          
          <label htmlFor="goalDescription">Goal Description :</label>
          <textarea name="goalDescription" id="goalDescription" value={goal && goalDescription} onChange={(e) => setGoalDescription(e.target.value)} />

          <button onClick={() => setEditMode(false)} className={styles.accent4}>Cancel</button>
          <button onClick={handleUpdateGoal} className={styles.accent2}>Update Goal</button>
        </div>
      </>
      }
    </div>
  );
}

export default Goal;