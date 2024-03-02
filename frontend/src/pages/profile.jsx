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
      <h1>{userIsLoggedIn && userProfile.displayName}'s Profile</h1>
      <div className={styles.section}>
        <p>This is where you would be able to edit your account info, if I had implemented that.</p>
        <p>I used some of the security best practices that I know when building this app.</p>
        <p>But there are probably some vulnerabilities and I didn't have time to prioritize security. </p>
        <p>If you are worried about that, you can delete your account below.</p>
      </div>

      <div className={styles.section}>
       <button onClick={handleLogout} className={styles.accent2}>Logout</button>
       <span>&lt;-- Done using the app?</span>
      </div>

      <div className={styles.section}>
        <button onClick={handleDeleteAccount} className={`${styles.accent4} ${styles.hoverRevealsWarning}`}>Delete Account</button>
        <span>&lt;-- Want your data erased?</span>
        <div className={styles.hiddenWarning}>
          <p> <span className={styles.errorMessage}>WARNING:</span> this is a destructive action and CANNNOT be undone. </p>
          <p>It will NOT ask you to confirm your decision.</p>  
          <p>All data regarding your account will be REMOVED. </p>
        </div>
      </div>

      <div className={styles.section}>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {(success && (success === 'User Registered' || success === 'User Logged Out')) && <p>Success: {success}</p>}
      </div>
    </div>
  );
}

export default Profile;