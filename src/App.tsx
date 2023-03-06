import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Signup from "./components/Signup/Signup";
import Footer from "./components/Footer/Footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    setIsLoggedIn(false);
  }

  return (
    <Router>
      <div>
        <NavigationBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Switch>
          <Route path="/login" component={Auth} />
          <Route path="/signup" component={Signup} />
          <Route
            path="/"
            render={() => (
              <Home isLoggedIn={isLoggedIn} onLogin={handleLogin} />
            )}
          />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
