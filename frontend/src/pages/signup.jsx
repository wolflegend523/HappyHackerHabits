import { Link, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { registerUser } from '../features/users/userActions';

const Login = () => {
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
      navigate('/login');
    }
  }, [navigate, success]);


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
    <div>
      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
        />
        <label>Display Name</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value.trim())}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value.trim())}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value.trim())}
        />
        <button type="submit">Create Account</button>
      </form>
      <Link to ="/login">Already have an account? Login here</Link>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {success && <div>Success: {success}</div>}
    </div>
  );
}

export default Login;