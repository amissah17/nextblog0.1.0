import Link from "next/link";
import styles from "../styles/Layout.module.css";


function Layout({ children }) {
  return (
    <>
      <nav className={styles.nav}>
        <div>
          <Link href="/"><h1>NextBlog 0.1</h1></Link>
        </div>
      </nav>
      {children}
    </>
  );
}



export default Layout;
