// import Link from "next/link";

import styles from "../styles/Layout.module.css";

import Nav from "./Nav";

function Layout({ children }) {
  return (
    <>
      <Nav />
      <main className={styles.main_style}>{children}</main>
    </>
  );
}

export default Layout;
