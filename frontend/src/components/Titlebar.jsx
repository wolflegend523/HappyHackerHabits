import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux'
import { logoutUser } from '../features/users/userSlice';
import { clearGoals } from '../features/goals/goalsSlice';
import logo from '../icons/happyHackerLogoColor.svg';
import SettingsIcon from '../icons/SettingsIcon';
import AccountIcon from '../icons/AccountIcon';
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

  return (
    <header className={styles.titlebar}>
      <img src={logo} alt="logo" className={styles.mainIcon} />
      <div>
      <Link className={styles.title} to="/"><p>Happy Hacker Habits</p></Link>
      </div>

      <div className={styles.titlebarButtons}>

        {userIsLoggedIn && <div className={styles.titlebarDropdown}>
          <Link className={styles.titlebarButton} to="/profile/"><AccountIcon className={styles.icon} /><p>{userProfile.displayName}</p></Link>
          <div className={styles.titlebarDropdownContent}> 
            <button onClick={() => navigate("/profile")}>Profile</button>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => navigate("/")}>Home</button>
          </div>
        </div>}

        {userIsLoggedIn && <Link className={styles.titlebarButton} to="/settings/"><SettingsIcon className={styles.icon}/><p>Settings</p></Link>}
        {!userIsLoggedIn && <Link className={styles.titlebarButton} to="/login/"><p>Login</p></Link>}
        {!userIsLoggedIn && <Link className={styles.titlebarButton} to="/signup/"><p>Signup</p></Link>}
      </div>
    </header>
  );
};

export default Titlebar;