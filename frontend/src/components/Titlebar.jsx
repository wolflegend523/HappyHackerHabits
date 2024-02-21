import { Link } from 'react-router-dom';
import logo from '../icons/happyHackerLogoColor.svg';
import styles from '../styles/Titlebar.module.css';
import {useSelector} from 'react-redux'


const Titlebar = () => {
  const { userIsLoggedIn, userProfile } = useSelector(
    (state) => state.user
  );

  return (
    <header className={styles.titlebar}>
      <img src={logo} alt="logo" className={styles.icon} />
      <div>
      <Link className={styles.title} to="/">Happy Hacker Habits</Link>
      </div>
      <div className={styles.titlebarButtons}>
        {userIsLoggedIn && <Link className={styles.titlebarButton} to="/profile/">{userProfile.display_name}</Link>}
        {userIsLoggedIn &&<Link className={styles.titlebarButton}>Setting</Link>}
        {!userIsLoggedIn && <Link className={styles.titlebarButton} to="/login/">Login</Link>}
        {!userIsLoggedIn && <Link className={styles.titlebarButton} to="/signup/">Signup</Link>}
      </div>
    </header>
  );
};

export default Titlebar;