const apiEndpoint = process.env.REACT_APP_BACKEND_API_BASE_URL;

async function getDailyQuote(token) {
  const response = await fetch(`${apiEndpoint}users/me/quotes/daily/`, {
    method: 'GET',
    headers: {
      'x-auth': token,
    },
  });
  return response;
}

export { getDailyQuote };