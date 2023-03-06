import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavigationBar.module.css";
import logo from "../../assets/logo.png";

interface Props {
  isLoggedIn: boolean;
  onLogout: () => void;
}

function NavigationBar({ isLoggedIn, onLogout }: Props) {
  return (
    <div className={styles.container}>
      <img height="20" src={logo} alt="Airbnb logo" />
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          {isLoggedIn ? (
            <li>
              <button onClick={onLogout}>Logout</button>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default NavigationBar;
