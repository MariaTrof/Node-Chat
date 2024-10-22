import { FC, PropsWithChildren } from "react";
import styles from "./Layout.module.scss";
//import { Outlet } from "react-router-dom";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>APP TEST</header>
      <div className={styles.content}>{children}</div>
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Layout;
