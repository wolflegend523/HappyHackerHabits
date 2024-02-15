const backendHostname = process.env.REACT_APP_BACKEND_HOSTNAME;
const backendPort = process.env.REACT_APP_BACKEND_PORT;
const backendBaseApi = process.env.REACT_APP_BACKEND_API_BASE_URL;
const apiEndpoint = `http://${backendHostname}:${backendPort}/${backendBaseApi}`;

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