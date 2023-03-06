import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.container}>
      <nav>
        <ul>
          <li>
            <a href="#">Terms</a>
          </li>
          <li>
            <a href="#">Privacy</a>
          </li>
          <li>
            <a href="#">Site map</a>
          </li>
        </ul>
      </nav>
      <p>&copy; All rights reserved.</p>
    </div>
  );
}

export default Footer;
