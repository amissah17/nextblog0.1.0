import { useState } from 'react';

const New = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/logo.svg" alt="Logo" />
      </div>
      <div className={`menu ${menuOpen ? "open" : ""}`}>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      <div className="hamburger" onClick={handleMenuClick}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background-color:#ccc;
        }
        .logo {
          flex: 1;
        }
        .menu {
          display: none;
        }
        .menu.open {
          display: block;
        }
        .menu ul {
          list-style: none;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin: 0;
          padding: 0;
        }
        .menu li {
          margin: 0 10px;
        }
        .hamburger {
          display: none;
          cursor: pointer;
        }
        .hamburger span {
          display: block;
          width: 30px;
          height: 3px;
          background-color: #333;
          margin: 5px 0;
        }
        @media screen and (max-width: 768px) {
          .menu {
            position: absolute;
            top: 70px;
            right: 0;
            width: 100%;
            background-color: #fff;
            z-index: 1;
            display: none;
            text-align: center;
          }
          .menu.open {
            display: block;
          }
          .menu ul {
            flex-direction: column;
          }
          .menu li {
            margin: 10px 0;
          }
          .hamburger {
            display: block;
          }
        }
      `}</style>
    </nav>
  );
};

export default New;
