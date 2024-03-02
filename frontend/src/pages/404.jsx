import { useNavigate } from 'react-router-dom';
import styles from '../styles/Pages.module.css';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <h1>404 - File Not Found 📁</h1>
      <div className={styles.section}> 
        <button onClick={() => navigate('/') } className= {styles.accent3}>Go Back to Home Directory </button>
        <span>
          &lt;-- Oh no! You got lost. This link will bring you home. 🦆
        </span> 
      </div>

      <div className={styles.section}> 
        <a href="https://github.com/wolflegend523/HappyHackerHabits"
          target="_blank"
          rel="noreferrer noopener">
            <button className= {styles.accent3}>Try to Find Bug</button>
        </a>
        
        <span>
          &lt;-- A bug must have got in. This link will bring you to the  code if you want to look for it. 🦋
        </span> 
      </div>
    </div>
  );
}

export default PageNotFound;