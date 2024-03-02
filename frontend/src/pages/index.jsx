import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import NewFolder from '../icons/NewFolder';
import styles from '../styles/Pages.module.css';

const HomePage = () => {
  const userIsLoggedIn = useSelector((state) => state.user.userIsLoggedIn);
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.section}>
        <h1>Welcome to Happy Hacker Habits! 👩‍💻</h1>
        <p>A programming themed productivity/self-care application.</p>
      </div>

      {!userIsLoggedIn &&
        <div className={styles.section}>
          <h2 className={styles.accent3}>Create an Account 🖱️</h2>
          <button onClick={() => navigate('/signup/') } className= {styles.accent3}>Create Account</button>
        <span className= {styles.accent3}>
          &lt;-- New to the app? Click here to create an Account! 🦆
        </span> 
        </div>
      }

      {!userIsLoggedIn &&
        <div className={styles.section}>
          <h2 className={styles.accent2}>Login ⌨️</h2>
          <button onClick={() => navigate('/login/') } className= {styles.accent2}>Login</button>
        <span className= {styles.accent2}>
          &lt;-- Been here before? Click here to Login! 🦆
        </span> 
        </div>
      }

      {userIsLoggedIn &&
        <div className={styles.section}>
          <h2 className={styles.accent3}>Getting Started 🖱️</h2>
          <p> New to the app? Start by creating a goal! Click the New Folder Icon <NewFolder /> to create a goal 🦆</p> 
        </div>
      }

      <div className={styles.section}>
        <h2>The "Explorer" 🗃️</h2>
        <p>The explorer section, found on the left side of the app, holds productivity tools.</p>
        <p>Right now the explorer just allows you to create goals.</p>
        <p>In the future, habits, tasks, notes, and more will be added, and nested under goals.</p>
        <p>Click on the "Goals" dropdown to view your current goals.</p>
        <p>Click on the "History" dropdown to view your past goals.</p>
        <p>Click on the New Folder Icon <NewFolder /> to create a new goal.</p>
        <p>Click on a goal to view its details.</p>
      </div>

      <div className={styles.section}>
        <h2>The "Terminal" 💻</h2>
        <p>The terminal section, found on the bottom of the app, holds self-care features.</p>
        <p>Right now the terminal just provides a daily quote.</p>
        <p>In the future emotion logging, an AI chatbot, and more will be added as other tabs.</p>
        <p>Click on the "Output Quote" tab to view your daily quote.</p>
      </div>
    </div>
  );
}

export default HomePage;