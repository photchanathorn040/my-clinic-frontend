import styles from './Container.module.css';

function Container({ children }) {
  // Component นี้จะรับ 'children' (Component อื่นๆ) มาใส่ข้างใน
  return <div className={styles.container}>{children}</div>;
}

export default Container;