const apiEndpoint = process.env.REACT_APP_BACKEND_API_BASE_URL;

async function postUser(email, displayName, password) {
  const response = await fetch(`${apiEndpoint}users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "email": email, "displayName": displayName, "password": password }),
  });

  return response;
}

async function postUserLogin(email, password) {
  const response = await fetch(`${apiEndpoint}users/logins/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "email": email, "password": password }),
  });

  return response;
}

async function deleteUser(token) {
  const response = await fetch(`${apiEndpoint}users/me/`, {
    method: 'DELETE',
    headers: {
      'x-auth': token,
    }
  });

  return response;
}

export { postUser, postUserLogin, deleteUser };