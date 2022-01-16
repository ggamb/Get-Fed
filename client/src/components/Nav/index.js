import React from "react";
import Auth from "../../utils/auth";
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
            <a href="/" onClick={() => Auth.logout()}>
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
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <div className="header">
        <h1>
          <nav class="navbar navbar-light bg-light">
            <div class="container">
              <Link to="/">
                <a class="navbar-brand" href="#">
                  <img src="../../utils/logo/logo.png" alt="" width="30" height="24"></img>
                </a>
              </Link>          
            </div>
          </nav>
          
            {/* <span role="img" aria-label="a tasty hamburger">🍔</span>
            Get Fed */} 
        
        </h1>
      </div>
      <nav id="nav">
        {showNavigation()}
      </nav>

      <div className="background"></div>

    </header>
  );
}

export default Nav;
