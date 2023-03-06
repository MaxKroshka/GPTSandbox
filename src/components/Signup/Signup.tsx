import React from "react";
import styles from "./Signup.module.css";

function Signup() {
  return (
    <div className={styles.container}>
      <h2>Create an Account</h2>
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
