import React from "react";
import styles from "./Home.module.css";
import Auth from "../Auth/Auth";

interface Props {
  isLoggedIn: boolean;
  onLogin: () => void;
}

function Home({ isLoggedIn, onLogin }: Props) {
  return (
    <div className={styles.container}>
      <h1>Quiz Game</h1>
      <p>
        Test your knowledge of world capitals! Choose a session to start
        playing.
      </p>
      {isLoggedIn ? <div>Logged in content goes here</div> : <Auth />}
    </div>
  );
}

export default Home;
