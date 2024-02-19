import { useState, useEffect } from "react";
import logo from './icons/logo.svg';
import { getDebuggingDuck } from '../api/debuggingDuckApi';
import styles from '../styles/Editor.module.css';

function Editor() {
  const [duckMessage, setDuckMessage] = useState(null);

  useEffect(() => {
    async function fetchDuck() {
      const duck = await getDebuggingDuck();
      setDuckMessage(duck.message);
    }

    fetchDuck();
  }, []);

  return (
    <div className={styles.editor}>
      <p className={styles.content}>
        <img src={logo} className={styles.logo} alt="logo" />
        {duckMessage && <p>{duckMessage}</p>}
      </p>
    </div>
  );
}

export default Editor;
