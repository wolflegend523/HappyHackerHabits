const apiEndpoint = process.env.REACT_APP_BACKEND_API_BASE_URL;

async function postGoal(token, name, description = null) {
  const response = await fetch(`${apiEndpoint}users/me/goals/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth': token,
    },
    body: JSON.stringify({ "goalName": name, "goalDescription": description }),
  });

  return response;
}


async function getGoals(token) {
  const response = await fetch(`${apiEndpoint}users/me/goals/`, {
    method: 'GET',
    headers: {
      'x-auth': token,
    },
  });

  return response;
}


async function getGoal(token, goalId) {
  const response = await fetch(`${apiEndpoint}users/me/goals/${goalId}`, {
    method: 'GET',
    headers: {
      'x-auth': token,
    },
  });

  return response;
}


async function putGoal(token, goalId, name, description = undefined, deployedAt = undefined) {
  const response = await fetch(`${apiEndpoint}users/me/goals/${goalId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-auth': token,
    },
    body: JSON.stringify({ "goalName": name, "goalDescription": description, "deployedAt": deployedAt }),
  });

  return response;
}


async function deleteGoal(token, goalId) {
  const response = await fetch(`${apiEndpoint}users/me/goals/${goalId}`, {
    method: 'DELETE',
    headers: {
      'x-auth': token,
    }
  });

  return response;
}



export { postGoal, getGoals, getGoal, putGoal, deleteGoal };