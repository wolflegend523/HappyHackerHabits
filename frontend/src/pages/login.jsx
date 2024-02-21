import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { loginUser } from '../features/users/userActions';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, success } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // redirect to home page if login is successful
  useEffect(() => {
    if (success) {
      navigate('/');
    }
  }, [navigate, success]);


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
    <div>
      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value.trim())}
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/signup">New? create an account here</Link>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {success && <div>Success: {success}</div>}
    </div>
  );
}

export default Login;