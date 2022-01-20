//sai
import { style } from '@mui/system';
import React from 'react';
import { Link } from "react-router-dom";



function Navbar() {
  return (
    <div className="navbar">
      
      <div className="leftSide">
      <p>Get Fed 🍔 </p>
      <div className="hiddenLinks">
      
          <Link to="/"> Home </Link>
        
          <Link to="/Login"> Login </Link>
          <Link to="/cart"> Cart🛒 </Link>
        </div>
      </div>
        <div className="rightSide">
        <Link to="/"> Home </Link>
        
        <Link to="/Login"> Login </Link>
        <Link to="/cart"> Cart🛒 </Link>
      </div>
      </div>
     
     
      
    )
}

export default Navbar






/*import React, { useState } from "react";*/

      /*import React from "react";*/

/*import Auth from "../../utils/auth";*/
       /*import Logo from "../assets/images/Logo.png";*/
/*import { Link } from "react-router-dom"; 8/


/*function Nav() {

  
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

export default Nav;*/
