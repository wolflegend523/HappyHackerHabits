import { useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { unregisterUser} from '../features/users/userActions';
import { logoutUser, resetStatus } from '../features/users/userSlice';


const Profile = () => {
  const { loading, error, success, userIsLoggedIn, userProfile} = useSelector(
    (state) => state.user
  );
  // need to get the token like this for it to work, not sure why
  const token = useSelector((state) => state.user.userToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  // redirect to the 404 page if the user is not logged in and there is not success message
  // or to the home page if the user is not logged in and there is a success message
  useEffect(() => {
    if (!userIsLoggedIn) {
      navigate('/');
      dispatch(resetStatus());
    }
  }, [navigate, dispatch, userIsLoggedIn]);
  

  // handle logout button click
  const handleLogout = () => {
    dispatch(logoutUser());
  }

  
  // handle delete account button click
  const handleDeleteAccount = () => {
    dispatch(unregisterUser({token}));
  }


  // render profile page
  return (
    <div>
      <h1>{userIsLoggedIn && userProfile.display_name}</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleDeleteAccount}>Delete Account</button>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {success && <div>Success: {success}</div>}
    </div>
  );
}

export default Profile;