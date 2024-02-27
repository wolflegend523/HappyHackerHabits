import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { readGoals } from '../features/goals/goalsActions';
import ChevronRight from '../icons/ChevronRight';
import styles from '../styles/Explorer.module.css';


const Explorer = () => {
  const [goalsOpen, setGoalsOpen] = useState(true);
  const userIsLoggedIn = useSelector((state) => state.user.userIsLoggedIn);
  const userToken = useSelector((state) => state.user.userToken);
  const goals = useSelector((state) => state.goals.goals);
  const dispatch = useDispatch();

  // get the goals from the server when the user logs in
  useEffect(() => {
    if (userIsLoggedIn) {
      dispatch(readGoals({token: userToken}));
    }
  }, [userIsLoggedIn, userToken, dispatch]);


  return (
    <div className={styles.explorer}>
      <p className={styles.title}>Explorer</p>
      <div>
        <input
            type="checkbox"
            className={styles.checkbox}
            id="goals-checkbox"
            checked={goalsOpen}
            onChange={() => setGoalsOpen(!goalsOpen)}
          />
          <label htmlFor="goals-checkbox" className={styles.heading}>
            <ChevronRight
              className={styles.chevron}
              style={ goalsOpen ? { transform: 'rotate(90deg)' } : {}}
            />
            Goals
          </label>

          <div className={styles.folders} style={ goalsOpen ? { display: 'block' } : { display: 'none' }}>
            {goals.map((item) => (
              <div key={item.goalId} className={styles.folder}>
                <p>{item.goalName}</p>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
}

export default Explorer;