import { useState } from 'react';
import styles from '../styles/Terminal.module.css';
import OutputQuote from './OutputQuote';
import DebugFeelings from './DebugFeelings';
import LogEmotions from './LogEmotions';


const Terminal = () => {
  // default to 'Output Quote' view
  const [activeTerminalView, setActiveTerminalView] = useState('Output Quote');

  return (
    <div className={styles.terminal}>
        <div className={styles.terminalTabs}>
          <button
            className={`${styles.terminalTab} ${activeTerminalView === 'Output Quote' && styles.activeTab}`}
            onClick={() => setActiveTerminalView('Output Quote')}
          >
            Output Quote
          </button>
          <button
            className={`${styles.terminalTab} ${activeTerminalView === 'Debug Feelings' && styles.activeTab}`}
            onClick={() => setActiveTerminalView('Debug Feelings')}
          >
            Debug Feelings
          </button>
          <button 
            className={`${styles.terminalTab} ${activeTerminalView === 'Log Emotions' && styles.activeTab}`}
            onClick={() => setActiveTerminalView('Log Emotions')}
          >
            Log Emotions
          </button>
        </div>

        <div className={styles.terminalView}>
          {activeTerminalView === 'Output Quote' && (
            <OutputQuote />
          )}
          {activeTerminalView === 'Debug Feelings' && (
            <DebugFeelings />
          )}
          {activeTerminalView === 'Log Emotions' && (
            <LogEmotions />
          )}
        </div>  
    </div>
  );
};

export default Terminal;