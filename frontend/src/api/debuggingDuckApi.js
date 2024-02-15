const apiEndpoint = process.env.REACT_APP_BACKEND_API_BASE_URL;

async function getDebuggingDuck() {
  const response = await fetch(`${apiEndpoint}debuggingduck/`);
  if (response.ok) {
    return response.json();
  } else {
    console.log(response);
    return null;
  }
}

export { getDebuggingDuck };