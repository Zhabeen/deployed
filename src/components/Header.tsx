import React from "react";
import styles from "./styles/Header.module.css";
import { Link } from "react-router-dom";

interface HeaderProps {
  showFavorites: boolean;
  toggleShowFavorites: () => void;
}

const Header: React.FC<HeaderProps> = ({
  showFavorites,
  toggleShowFavorites,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div>
          <Link to="/products">
            <img src="logo.png" alt="Логотип" className={styles.logo} />
          </Link>
        </div>
        <div>
          <button onClick={toggleShowFavorites} className={styles.filter}>
            {showFavorites ? "Показать все" : "Избранное"}
          </button>
          <Link to="/create-product">
            <button className={styles.filter}>Создать продукт</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
