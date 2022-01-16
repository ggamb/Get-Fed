import React from "react";
import Auth from "../../utils/auth";
//import Logo from "../assets/images/Logo.png";
import { Link } from "react-router-dom";



function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/orderHistory">
              Order History
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()} >
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/Menu">
              Menu
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/">
            <span
        role="img"
        aria-label="cart">🛒</span>
          cart
            </Link>
          </li>


        </ul>
        
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
          <span role="img" aria-label="a tasty hamburger">🍔</span>
          Get Fed
        </Link>
      </h1>

      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
};

export default Nav;
