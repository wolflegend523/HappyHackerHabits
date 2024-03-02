import { Link } from 'react-router-dom';
// icon imports
import ErrorIcon from '../icons/ErrorIcon';
import WarningIcon from '../icons/WarningIcon';
import BellIcon from '../icons/BellIcon';
import CheckIcon from '../icons/CheckIcon';
import SourceControlIcon from '../icons/SourceControlIcon';
// style imports
import styles from '../styles/Bottombar.module.css';

const Bottombar = () => {
  return (
    <footer className={styles.bottombar}>
      <div className={styles.container}>
        <a
          href="https://github.com/wolflegend523/HappyHackerHabits"
          target="_blank"
          rel="noreferrer noopener"
          className={styles.section}
        >
          <SourceControlIcon className={styles.icon} />
          <p>main</p>
        </a>

        <Link className={styles.section} to="/">
            <ErrorIcon className={styles.icon} />
            <p className={styles.errorText}>0</p>&nbsp;&nbsp;
            <WarningIcon className={styles.icon} />
            <p>0</p>
        </Link>
      </div>


      <div className={styles.container}>
        <Link className={styles.section}>
          <CheckIcon className={styles.icon} />
          <p>Prettier</p>
        </Link>
        <Link className={styles.section}>
          <BellIcon className={styles.icon}/>
          <p>Notifications</p>
        </Link>
      </div>
    </footer>
  );
};

export default Bottombar;