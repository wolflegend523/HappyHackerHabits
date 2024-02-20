import { useState, useEffect } from "react";
import logo from '../icons/happyHackerLogoColor.svg';
import { getDebuggingDuck } from '../features/debuggingDuck/debuggingDuckApi';
import style from '../styles/HomePage.module.css';

const HomePage = () => {
  const [duckMessage, setDuckMessage] = useState(null);

  useEffect(() => {
    async function fetchDuck() {
      const duck = await getDebuggingDuck();
      setDuckMessage(duck.message);
    }

    fetchDuck();
  }, []);

  return (
    <div>
      <img src={logo} className={style.logo} alt="logo" />
      {duckMessage && <p>{duckMessage}</p>}
    </div>
  );
}

export default HomePage;