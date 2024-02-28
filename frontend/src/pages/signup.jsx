import { Link, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { registerUser} from '../features/users/userActions';
import { resetStatus } from '../features/users/userSlice';
import styles from '../styles/Pages.module.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState(''); 
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { loading, error, success } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // redirect to the login page if registration is successful
  useEffect(() => {
    if (success) {
      // navigate to the login page after 1 second
      setTimeout(() => {
        dispatch(resetStatus());
        navigate('/login');
      }, 1000);
    }
  }, [navigate, dispatch, success]);


  // validate registration inputs
  const validRegistration = () => {
    //TODO: validate inputs
    return true;
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
      <form onSubmit={handleLogin}>
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
          <label htmlFor='displayName'>Display Name &#40;optional&#41; :</label>
          <input
            name="displayName"
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value.trim())}
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

        <div>
        <label htmlFor='passwordConfirm'>Confirm Password* :</label>
          <input
            name="passwordConfirm"
            id="passwordConfirm"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value.trim())}
          />
        </div>

        <button type="submit">Create Account</button>

      </form>
      <Link to ="/login">Already have an account? Login here</Link>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {success && <p>Success: {success}</p>}
    </div>
  );
}

export default Signup;