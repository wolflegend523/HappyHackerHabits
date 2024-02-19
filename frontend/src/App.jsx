import {Route, Routes } from "react-router-dom";
import HomePage from "./pages";
import Titlebar from "./components/Titlebar";
import Explorer from "./components/Explorer";
import Editor from "./components/Editor";
import Terminal from "./components/Terminal";
import Bottombar from "./components/Bottombar";
import styles from './styles/App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.titlebar}><Titlebar /></div>
      <div className={styles.explorer}><Explorer /></div>

      <div className={styles.editor}>
        <Editor>
          <Routes>
            <Route path="/" element={<HomePage/>} />
          </Routes>
        </Editor>
      </div>

      <div className={styles.terminal}><Terminal /></div>
      <div className={styles.bottombar}><Bottombar /></div>
    </div>
  );
}

export default App;
