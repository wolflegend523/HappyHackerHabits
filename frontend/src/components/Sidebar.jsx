// React imports
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux'
import { logoutUser } from '../features/users/userSlice';
import { clearGoals } from '../features/goals/goalsSlice';
// Icon imports
import FilesIcon from '../icons/FilesIcon';
import SettingsIcon from '../icons/SettingsIcon';
import AccountIcon from '../icons/AccountIcon';
// Style imports
import styles from '../styles/Sidebar.module.css';


const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userIsLoggedIn = useSelector((state) => state.user.userIsLoggedIn);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearGoals());
    navigate("/");
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarTop}>
        <div className={`${styles.iconContainer} ${styles.active}`}>
          <FilesIcon className={styles.icon}/>
        </div>
      </div>

      <div className={styles.sidebarBottom}>
        <div className={`${styles.iconContainer} ${userIsLoggedIn && styles.sidebarDropdown}`} onClick={ () => navigate('/profile')}>
          <AccountIcon className={styles.icon}/>
          <div className={styles.sidebarDropdownContent}> 
            <button onClick={() => navigate("/profile")}>Profile</button>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => navigate("/")}>Home</button>
          </div>
        </div>

        <div className={styles.iconContainer} onClick={ () => navigate('/settings/')}>
          <SettingsIcon className={styles.icon}/>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
