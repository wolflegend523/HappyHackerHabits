import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux'
import { logoutUser } from '../features/users/userSlice';
import { clearGoals } from '../features/goals/goalsSlice';
import logo from '../icons/happyHackerLogoColor.svg';
import styles from '../styles/Titlebar.module.css';


const Titlebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userIsLoggedIn, userProfile } = useSelector(
    (state) => state.user
  );

  // handle logout button click
  // TODO: this should be a helper function
  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearGoals());
    navigate("/");
  }

  const handleProfile = () => {
    navigate("/profile");
  }

  const handleHome = () => {
    navigate("/");
  }

  const handleGetLost = () => {
    navigate("/404");
  }


  return (
    <header className={styles.titlebar}>
      <img src={logo} alt="logo" className={styles.icon} />
      <div>
      <Link className={styles.title} to="/">Happy Hacker Habits</Link>
      </div>

      <div className={styles.titlebarButtons}>

        {userIsLoggedIn && <div className={styles.titlebarDropdown}>
          <Link className={styles.titlebarButton} to="/profile/">{userProfile.displayName}</Link>
          <div className={styles.titlebarDropdownContent}> 
            <button onClick={handleHome}>Home</button>
            <button onClick={handleProfile}>Profile</button>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleGetLost}>Get Lost 🦆</button>
          </div>
        </div>}

        {userIsLoggedIn &&<Link className={styles.titlebarButton} to="/">Settings</Link>}
        {!userIsLoggedIn && <Link className={styles.titlebarButton} to="/login/">Login</Link>}
        {!userIsLoggedIn && <Link className={styles.titlebarButton} to="/signup/">Signup</Link>}
      </div>
    </header>
  );
};

export default Titlebar;