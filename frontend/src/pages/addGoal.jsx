import { Link, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { createGoal } from '../features/goals/goalsActions';
import styles from '../styles/Pages.module.css';

const AddGoal = () => {
  const [goalName, setGoalName] = useState('');
  const [goalDescription, setGoalDescription] = useState(''); 
  const [goalNameError, setGoalNameError] = useState('');
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
      navigate('/login/');
    }
  }, [navigate, userIsLoggedIn]);


  // handle add goal form submission
  const handleAddGoal = async (e) => {
    // prevent form from submitting
    e.preventDefault();

    // remove any trailing whitespace from the goal name and description
    // TODO: this isn't working (there is a space at the end of the goal name and description)
    setGoalName(removeLeadingAndTrailingWhiteSpace(goalName));
    setGoalDescription(removeLeadingAndTrailingWhiteSpace(goalDescription));

    // validate goal name
    if (!goalName) {
      setGoalNameError('Goal name is required');
      return;
    }
    setGoalNameError('');

    // dispatch add goal action
    dispatch(createGoal({name: goalName, description: (goalDescription ? goalDescription : null), token: userToken}));
  }


  // helper functions to remove leading and trailing whitespace
  const removeLeadingWhiteSpace = (str) => {
    return str.replace(/^\s+/, '');
  }
  const removeLeadingAndTrailingWhiteSpace = (str) => {
    return str.trim();
  }


  // render add goal page
  return (
    <div className={styles.page}>
      <h1>Add Goal</h1>

      <form onSubmit={handleAddGoal}>
        <div>
        <label htmlFor='goalName'>Goal Name* :</label>
        <input
          type="text"
          name="goalName"
          id="goalName"
          value={goalName}
          onChange={(e) => setGoalName(removeLeadingWhiteSpace(e.target.value))}
        />
        <span className={styles.formErrorMessage}>{goalNameError}</span>
        </div>

        <label htmlFor='goalDescription'>Goal Description &#40;optional&#41; :</label>
        <textarea
          name="goalDescription"
          id="goalDescription"
          value={goalDescription}
          onChange={(e) => setGoalDescription(removeLeadingWhiteSpace(e.target.value))}
        />

        <button type="submit" className={styles.accent2}>Add Goal</button>
      </form>

      <Link to="/">Go back to Welcome Page</Link>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {(success && success === 'Goal Created') && <p>Success: {success}</p>}
    </div>
  );
}

export default AddGoal;