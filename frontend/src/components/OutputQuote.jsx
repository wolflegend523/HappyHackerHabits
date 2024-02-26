import { useState, useEffect } from 'react';
import { useSelector} from 'react-redux'
import { getDailyQuote } from '../features/quotes/quoteApi';

// TODO: add more error checking/inform the user when quote fetch fails? 
const OutputQuote = () => {
  const [quote, setQuote] = useState(null);
  const token = useSelector((state) => state.user.userToken);
  const userIsLoggedIn = useSelector((state) => state.user.userIsLoggedIn);
  

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await getDailyQuote(token);
        if (response.ok) {
          const data = await response.json();
          setQuote(data);
        }
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };
    fetchQuote();
    
  }, [token]);

  return (
    <>
      {!userIsLoggedIn && <p>&#91;Debugging Duck&#129414;&#93;$ Log in to see your daily quote</p>}
      {(quote && userIsLoggedIn) && (<p>&#91;{quote.quoteAuthor}&#93;$ "{quote.quoteText}"</p>)}
    </>
  );
}

export default OutputQuote;