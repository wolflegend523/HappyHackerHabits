import { Link, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { registerUser} from '../features/users/userActions';
import styles from '../styles/Pages.module.css';

const Signup = () => {
  // user inputs
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState(''); 
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  // error messages for user inputs
  const [emailError, setEmailError] = useState('');
  const [displayNameError, setDisplayNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');

  // get user status from the store
  const { loading, error, success } = useSelector(
    (state) => state.user
  );

  // get dispatch and navigate functions
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // redirect to the login page if registration is successful
  useEffect(() => {
    if (success && success === 'User Registered') {
      // navigate to the login page after 1 second
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }
  }, [navigate, dispatch, success]);


  // validate registration inputs
  const validRegistration = () => {
    let valid = true;

    if (!email || !email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      setEmailError('Valid email is required');
      valid = false;
    } else {
      setEmailError('');
    }

    if (displayName && displayName.length > 40) {
      setDisplayNameError('Display name must be no longer than 40 characters');
      valid = false;
    } else {
      setDisplayNameError('');
    }

    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (password !== passwordConfirm) {
      setPasswordConfirmError('Passwords do not match');
      valid = false;
    } else {
      setPasswordConfirmError('');
    }

    return valid;
  }


  // handle registration form submission
  const handleLogin = async (e) => {
    // prevent form from submitting
    e.preventDefault();

    // validate account information
    if (!validRegistration()) {
      return;
    }

    // dispatch register action
    dispatch(registerUser({email, displayName, password}));
  }

  // render registration form
  return (
    <div className={styles.page}>
      <h1>Create an Account Here</h1>

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
          <span className={styles.errorMessage}>{emailError}</span>
        </div>

        <div>
          <label htmlFor='displayName'>Display Name &#40;optional&#41; :</label>
          <input
            name="displayName"
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value.trim())}
          />
          <span className={styles.errorMessage}>{displayNameError}</span>
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
          <span className={styles.errorMessage}>{passwordError}</span>
        </div>

        <div>
        <label htmlFor='passwordConfirm'>Confirm Password* :</label>
          <input
            name="passwordConfirm"
            id="passwordConfirm"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value.trim())}
          />
          <span className={styles.errorMessage}>{passwordConfirmError}</span>
        </div>

        <button type="submit" className={styles.accent2}>Create Account</button>
      </form>

      <div className={styles.section}>
        {loading && <p>Loading...</p>}
        {error && <p className={styles.errorMessage}>Error: {error}</p>}
        {(success && success === 'User Registered') && <p className={styles.accent3}>Success: {success}</p>}
      </div>

      <Link to ="/login" className={styles.section}>Already have an account? --&gt; Login here</Link>
    </div>
  );
}

export default Signup;