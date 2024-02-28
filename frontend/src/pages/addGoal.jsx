import { Link, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { createGoal } from '../features/goals/goalsActions';
import styles from '../styles/Pages.module.css';

const AddGoal = () => {
  const [goalName, setGoalName] = useState('');
  const [goalDescription, setGoalDescription] = useState(''); 
  const {userIsLoggedIn, userToken } = useSelector(
    (state) => state.user
  );
  const { loading, error, success } = useSelector(
    (state) => state.goals
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // redirect to the login page if the user is not logged in
  useEffect(() => {
    if (!userIsLoggedIn) {
      navigate('/login');
    }
  }, [navigate, userIsLoggedIn]);


  // handle add goal form submission
  const handleAddGoal = async (e) => {
    // prevent form from submitting
    e.preventDefault();

    //  remove any trailing whitespace from the goal name and description
    setGoalName(removeTrailingWhiteSpace(goalName));
    setGoalDescription(removeTrailingWhiteSpace(goalDescription));

    // validate goal name
    if (!goalName) {
      return;
    }

    // dispatch add goal action
    dispatch(createGoal({name: goalName, description: (goalDescription ? goalDescription : null), token: userToken}));
  }


  // helper functions to remove leading and trailing whitespace
  const removeLeadingWhiteSpace = (str) => {
    return str.replace(/^\s+/, '');
  }
  const removeTrailingWhiteSpace = (str) => {
    return str.replace(/\s+$/, '');
  }


  // render add goal page
  return (
    <div className={styles.page}>
      <h1>Add Goal</h1>

      <form onSubmit={handleAddGoal}>
        <label htmlFor='goalName'>Goal Name*</label>
        <input
          type="text"
          name="goalName"
          id="goalName"
          value={goalName}
          onChange={(e) => setGoalName(removeLeadingWhiteSpace(e.target.value))}
        />

        <label htmlFor='goalDescription'>Goal Description &#40;optional&#41;</label>
        <textarea
          name="goalDescription"
          id="goalDescription"
          value={goalDescription}
          onChange={(e) => setGoalDescription(removeLeadingWhiteSpace(e.target.value))}
        />

        <button type="submit">Add Goal</button>
      </form>

      <Link to="/">Go back to Welcome Page</Link>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {success && <p>Success: {success}</p>}
    </div>
  );
}

export default AddGoal;