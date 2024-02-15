import { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import { getDebuggingDuck } from './api/debuggingDuckApi';


function App() {
  const [duckMessage, setDuckMessage] = useState(null);

  useEffect(() => {
    async function fetchDuck() {
      const duck = await getDebuggingDuck();
      setDuckMessage(duck.message);
    }

    fetchDuck();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {duckMessage && <p>{duckMessage}</p>}
      </header>
    </div>
  );
}

export default App;
