import styles from '../styles/Terminal.module.css';

const LogEmotions = () => {
  return (
    <p>
      <span className={styles.terminalPath}>&#91;Debugging Duck🦆&#93;</span>$
      <span className={styles.terminalOutput}> Feature coming soon</span>
    </p>
  );
};

export default LogEmotions;