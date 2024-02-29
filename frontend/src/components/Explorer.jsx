import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { readGoals } from '../features/goals/goalsActions';
import ChevronRight from '../icons/ChevronRight';
import NewFolder from '../icons/NewFolder';
import styles from '../styles/Explorer.module.css';


const Explorer = () => {
  const [goalsRootFolderOpen, setGoalsRootFolderOpen] = useState(true);
  const userIsLoggedIn = useSelector((state) => state.user.userIsLoggedIn);
  const userToken = useSelector((state) => state.user.userToken);
  const goals = useSelector((state) => state.goals.goals);
  const [foldersOpen, setFoldersOpen] = useState(new Map());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get the goals from the server when the user logs in
  useEffect(() => {
    if (userIsLoggedIn) {
      dispatch(readGoals({token: userToken}));
    }
  }, [userIsLoggedIn, userToken, dispatch]);

  // set the folder open state when the goals change
  useEffect(() => {
    if (goals.length > 0) {
      const newFoldersOpen = new Map();
      goals.forEach((item) => {
        newFoldersOpen.set(item.goalId, false);
      });
      setFoldersOpen(newFoldersOpen);
    }
  }, [goals]);


  // change the chevron and navigate to the goal page when a goal is clicked
  const handleGoalClick = (goalId) => {
    const newFoldersOpen = new Map(foldersOpen);
    newFoldersOpen.set(goalId, !foldersOpen.get(goalId));
    setFoldersOpen(newFoldersOpen);
    navigate(`/goals/${goalId}`);
  }


  return (
    <div className={styles.explorer}>
      <div className={styles.titleContainer}>
        <p className={styles.title}>Explorer</p>
      </div>
      <div className={styles.explorerContent}>
        <input
            type="checkbox"
            className={styles.checkbox}
            id="goals-checkbox"
            checked={goalsRootFolderOpen}
            onChange={() => setGoalsRootFolderOpen(!goalsRootFolderOpen)}
          />
          <label htmlFor="goals-checkbox" className={styles.heading}>
            <ChevronRight
              className={styles.chevron}
              style={ goalsRootFolderOpen ? { transform: 'rotate(90deg)' } : {}}
            />
            Goals
            <Link className={styles.newFolderButton} to="/addGoal">
              <NewFolder/>
            </Link>
          </label>

          <div className={styles.folders} style={ goalsRootFolderOpen ? { display: 'block' } : { display: 'none' }}>
            {goals.map((item) => (
              <div key={item.goalId} className={styles.folder}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  id={item.goalId + '-checkbox'}
                  checked={foldersOpen.get(item.goalId)}
                  onChange={() => {
                    handleGoalClick(item.goalId);
                  }}
                />              
                <label htmlFor={item.goalId + '-checkbox'} className={styles.folder}>
                  <ChevronRight
                    className={styles.chevron}
                    style={foldersOpen.get(item.goalId) ? { transform: 'rotate(90deg)' } : {}}
                  />
                  {item.goalName}
                </label>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
}

export default Explorer;