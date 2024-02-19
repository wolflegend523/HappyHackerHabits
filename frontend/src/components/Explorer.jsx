import { useState } from 'react';
import ChevronRight from './icons/ChevronRight';
import styles from '../styles/Explorer.module.css';

const Explorer = () => {
  const [goalsOpen, setGoalsOpen] = useState(true);

  return (
    <div className={styles.explorer}>
      <p className={styles.title}>Explorer</p>
      <div>
        <input
            type="checkbox"
            className={styles.checkbox}
            id="goals-checkbox"
            checked={goalsOpen}
            onChange={() => setGoalsOpen(!goalsOpen)}
          />
          <label htmlFor="goals-checkbox" className={styles.heading}>
            <ChevronRight
              className={styles.chevron}
              style={ goalsOpen ? { transform: 'rotate(90deg)' } : {}}
            />
            Goals
          </label>
      </div>
    </div>
  );
}

export default Explorer;