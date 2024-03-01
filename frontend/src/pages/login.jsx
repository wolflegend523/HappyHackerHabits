import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { loginUser } from '../features/users/userActions';
import styles from '../styles/Pages.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, success, userIsLoggedIn } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // redirect to home page if login is successful
  useEffect(() => {
    if (userIsLoggedIn) {
      // navigate to the homepage after 1 second
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  }, [navigate, dispatch, userIsLoggedIn]);


  // handle login form submission
  const handleLogin = async (e) => {
    // prevent form from submitting
    e.preventDefault();
    // validate email and password
    if (!email || !password) {
      return;
    }
    // dispatch login action
    dispatch(loginUser({email, password}));
  }

  // render login form
  return (
    <div className={styles.page}>
      <h1>Login Here</h1>
      {(success && success === 'User Registered') && 
        <p className={`${styles.section} ${styles.accent3}`}>
          🦆 Thanks for creating an account! I am lazy, so you need to login yourself now. 🦆
        </p>
      }

      <form onSubmit={handleLogin} className={styles.section}>
        <div>
          <label htmlFor='email'>Email* :</label>
          <input
            name="email"
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
          />
        </div>

        <div>
          <label htmlFor='password'>Password* :</label>
          <input
            name="password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
          />
        </div>

        <button type="submit" className={styles.accent2}>Login</button>
      </form>

      <div className={styles.section}>
        {loading && <p>Loading...</p>}
        {error && <p className={styles.errorMessage}>Error: {error}</p>}
        {(success && success === 'User Logged In') && <p className={styles.accent3}>Success: {success}</p>}
      </div>

      <Link to="/signup" className={styles.section}>New? --&gt; create an account here</Link>

    </div>
  );
}

export default Login;