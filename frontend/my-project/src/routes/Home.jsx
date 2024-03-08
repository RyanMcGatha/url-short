import React from "react";
import "./home.css";
import { useAuth } from "./AuthContacs";
import { Link } from "react-router-dom";

const Home = () => {
  const { isAuth } = useAuth();
  return (
    <div id="main">
      <h1>Welcome to the URL Shortener App</h1>
      {isAuth ? (
        <p>Logged In</p>
      ) : (
        <div id="loginLink">
          <Link to="/signin">
            <p>Please Sign In</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
