import { useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { unregisterUser} from '../features/users/userActions';
import { logoutUser } from '../features/users/userSlice';
import { clearGoals } from '../features/goals/goalsSlice';
import styles from '../styles/Pages.module.css';

const Profile = () => {
  const { loading, error, success, userIsLoggedIn, userProfile} = useSelector(
    (state) => state.user
  );
  // need to get the token like this for it to work, not sure why
  const token = useSelector((state) => state.user.userToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  // redirect to the 404 page if the user is not logged in and there is not success message
  // or to the home page if the user is not logged in and there is a success message
  useEffect(() => {
    if (!userIsLoggedIn) {
      navigate('/login/');
    }
  }, [navigate, dispatch, userIsLoggedIn]);
  

  // handle logout button click
  // TODO: this should be a helper function
  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearGoals());
    navigate("/");
  }

  
  // handle delete account button click
  const handleDeleteAccount = () => {
    dispatch(unregisterUser({token}));
  }


  // render profile page
  return (
    <div className={styles.page}>
      <h1>{userIsLoggedIn && userProfile.displayName}</h1>
      <button onClick={handleLogout} className={styles.accent2}>Logout</button>
      <button onClick={handleDeleteAccount} className={styles.accent4}>Delete Account</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {(success && (success === 'User Registered' || success === 'User Logged Out')) && <p>Success: {success}</p>}
    </div>
  );
}

export default Profile;