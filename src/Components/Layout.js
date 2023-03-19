import { useState } from "react";
import styles from "../styles/Layout.module.css";

import Nav from "./Nav";

function Layout({ children }) {
  const [navActive, setNavActive] = useState(false);

  return (
    <>
      <Nav navActive={navActive} setNavActive={setNavActive} />
      <main className={styles.main_style}>{children}</main>
    </>
  );
}

export default Layout;
