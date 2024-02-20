import { Link } from 'react-router-dom';
import logo from '../icons/happyHackerLogoColor.svg';
import styles from '../styles/Titlebar.module.css';

const Titlebar = () => {
  return (
    <header className={styles.titlebar}>
      <img src={logo} alt="logo" className={styles.icon} />
      <div>
      <Link className={styles.title} to="/">Happy Hacker Habits</Link>
      </div>
      <div className={styles.titlebarButtons}>
        <Link className={styles.titlebarButton} to="/login/">Login</Link>
        <Link className={styles.titlebarButton} to="/signup/">Signup</Link>
      </div>
    </header>
  );
};

export default Titlebar;