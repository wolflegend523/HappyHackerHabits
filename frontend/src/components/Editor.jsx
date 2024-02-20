import Tabsbar from './Tabsbar';
import styles from '../styles/Editor.module.css';

const Editor = ({children}) => {
  return (
    <div className={styles.editor}>
      <Tabsbar/>
      <main id="main-editor" className={styles.content}>
        {children}
      </main>
    </div>
  );
}

export default Editor;
