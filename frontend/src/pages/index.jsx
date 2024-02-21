import logo from '../icons/happyHackerLogoColor.svg';
import style from '../styles/HomePage.module.css';

const HomePage = () => {

  return (
    <>
      <img src={logo} className={style.logo} alt="logo" />
      <p>
        <code>Welcome to Happy Hacker Habits!</code>
      </p>
    </>
  );
}

export default HomePage;