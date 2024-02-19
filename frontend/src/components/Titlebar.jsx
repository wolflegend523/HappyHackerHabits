import logo from '../icons/happyHackerLogoColor.svg';
import styles from '../styles/Titlebar.module.css';

const Titlebar = () => {
  return (
    <header className={styles.titlebar}>
      <img src={logo} alt="logo" className={styles.icon} />
      <p className={styles.title}>Happy Hacker Habits</p>
      <div className={styles.titlebarButtons}>
        <button className={styles.titlebarButton}>Profile</button>
        <button className={styles.titlebarButton}>Settings</button>
      </div>
    </header>
  );
};

export default Titlebar;