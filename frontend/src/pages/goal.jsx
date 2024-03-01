import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

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

  const handleUndeployGoal = () => {
    dispatch(updateGoal({token, goalId, deployedAt: null}));
  }

  const handleRemoveGoal = () => {
    dispatch(removeGoal({token, goalId}));
  }

  return (
    <div className={styles.page}>

      {(!goal) && 
      <>
        <h1>Goal Not Found 📁</h1>
        <p className={styles.section}>This goal was either successfully deleted, or never existed.</p>

        <div className={styles.section}> 
        <button onClick={() => navigate('/') } className= {styles.accent3}>  Back to Home Directory </button>
        <span className= {styles.accent3}>
          &lt;-- This link will bring you home. 🦆
        </span> 
      </div>
      </>
      }

      {(!editMode && goal) && 
        <>
          <h1>Goal: "{goal.goalName}"</h1>

          <div className={styles.section}>
            <p>{goal.goalDescription}</p>
            <p>
              <span className= {styles.accent3}>Status:</span> {goal.deployedAt ? <>deployed on {goal.deployedAt}</> : <>in progress</>}
            </p>
            <p>------------------------------------------------------------------</p>
          </div>
          
          <div className={`${styles.section} ${styles.floatColumnContainer}`}>
            <div className={styles.section}>
              <button onClick={() => setEditMode(true)} className={styles.accent2}>Edit Goal</button>
              <span>&lt;-- Want to change something?</span>
            </div>

            {!goal.deployedAt && 
            <div className={styles.section}>
              <button onClick={handleDeployGoal} className={styles.accent3}>Deploy Goal</button>
              <span>&lt;-- Finished the goal?</span>
            </div>
            }

            {goal.deployedAt && 
            <div className={styles.section}>
              <button onClick={handleUndeployGoal} className={styles.accent4}>Undeploy Goal</button>
              <span>&lt;-- Not quite done with this goal?</span>
            </div>
            }

            <div className={styles.section}>
              <button onClick={handleRemoveGoal} className={`${styles.accent4} ${styles.hoverRevealsWarning}`}>Delete Goal</button>
              <span>&lt;-- Want to remove this goal from your account?</span>
              <div className={styles.hiddenWarning}>
                <p> <span className={styles.errorMessage}>WARNING:</span> this is a destructive action and CANNNOT be undone. </p>
                <p>This action is only recommended if you did not mean to create the goal.</p>
                <p>It will NOT ask you to confirm your decision.</p>  
                <p>All data regarding this goal will be REMOVED. </p>
              </div>
            </div>
          </div>
        </>
      }

      {(editMode && goal) &&
      <>
        <h1>Editing Goal: "{goal.goalName}"</h1>
        <p className={styles.section}>Edit the details below, then click "Update Goal" to confirm the changes.</p>

        <div className={`${styles.section} ${styles.floatColumnContainer}`}>
          <div>
            <label htmlFor="goalName">Goal Name :</label>
            <input name="goalName" id="goalName" type="text" value={goalName} onChange={(e) => setGoalName(e.target.value)} />
          </div>
          
          <label htmlFor="goalDescription">Goal Description :</label>
          <textarea name="goalDescription" id="goalDescription" value={goalDescription} onChange={(e) => setGoalDescription(e.target.value)} />
        </div>

        <div className={styles.section}>
          <div>
            <button onClick={() => setEditMode(false)} className={styles.accent4}>Cancel</button>
            <span>&lt;-- Changed your mind? </span>
          </div>

          <div>
            <button onClick={handleUpdateGoal} className={styles.accent2}>Update Goal</button>
            <span>&lt;-- Like your changes? </span>
          </div>
        </div>
          
      </>
      }
    </div>
  );
}

export default Goal;