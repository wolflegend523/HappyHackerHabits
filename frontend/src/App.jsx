// react imports
import {Route, Routes } from "react-router-dom";
// app pages
import HomePage from "./pages";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Profile from "./pages/profile";
import AddGoal from "./pages/addGoal";
import Goal from "./pages/goal";
import PageNotFound from "./pages/404";
// app components 
import Titlebar from "./components/Titlebar";
import Explorer from "./components/Explorer";
import Editor from "./components/Editor";
import Terminal from "./components/Terminal";
import Bottombar from "./components/Bottombar";
// app styles
import styles from './styles/App.module.css';

// App component
function App() {
  return (
    <div className={styles.app}>
      <div className={styles.titlebar}><Titlebar /></div>
      <div className={styles.explorer}><Explorer /></div>

      <div className={styles.editor}>
        <Editor>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/addGoal" element={<AddGoal/>} />
            <Route path="/goals/:goalId" element={<Goal/>} />
            <Route path="*" element={<PageNotFound/>} />
          </Routes>
        </Editor>
      </div>

      <div className={styles.terminal}><Terminal /></div>
      <div className={styles.bottombar}><Bottombar /></div>
    </div>
  );
}

export default App;
