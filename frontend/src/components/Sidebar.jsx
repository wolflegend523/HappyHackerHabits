// React imports
import { useNavigate} from 'react-router-dom';
// Icon imports
import FilesIcon from '../icons/FilesIcon';
import SettingsIcon from '../icons/SettingsIcon';
import AccountIcon from '../icons/AccountIcon';
// Style imports
import styles from '../styles/Sidebar.module.css';


const Sidebar = () => {
  const navigate = useNavigate();

  const sidebarBottomItems = [
    { icon: <AccountIcon className={styles.icon}/>,  onClick: () => navigate('/profile') },
    { icon: <SettingsIcon className={styles.icon}/>,  onClick: () => navigate('/') },
  ];

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarTop}>
        <div className={`${styles.iconContainer} ${styles.active}`}>
          <FilesIcon className={styles.icon}/>
        </div>
      </div>

      <div className={styles.sidebarBottom}>
        {sidebarBottomItems.map((item, index) => (
          <div key={index} className={styles.iconContainer} onClick={item.onClick}>
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
