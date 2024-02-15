import { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import { getDebuggingDuck } from './api/debuggingDuckApi';


function App() {
  const [duckMessage, setDuckMessage] = useState(null);

  useEffect(() => {
    getDebuggingDuck().then((duck) => setDuckMessage(duck.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {duckMessage && <p>{duckMessage}</p>}
      </header>
    </div>
  );
}

export default App;
