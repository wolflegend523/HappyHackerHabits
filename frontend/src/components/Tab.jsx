import { useLocation } from 'react-router-dom';
import styles from '../styles/Tab.module.css';

const Tab = () => {
  const location = useLocation();
  const path = (location.pathname.replaceAll('/', '') || 'Welcome') + '.jsx';
  return (
    <p className={`${styles.tab} ${styles.active}`}>{path}</p>
  );
};

export default Tab;