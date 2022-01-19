import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import logo from "../../utils/images/logo.png";
import { Button, Outline } from "reactstrap";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1 ">
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
        <ul className="flex-row position-relative top-0 end-0">
          <Button outline color="success" className="mx-1 signup">
            <Link to="/signup">
              Signup
            </Link>
          </Button>
          <li className="mx-1 login">
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
          <nav>  
              <Link to="/" className="position-absolute top-0 start-50 translate-middle-x">
                  <img src= {logo} alt="" width="120" height="100"></img>
              </Link>   
              <nav id="nav" className="button ">
                {showNavigation()}
               </nav>       
         
          </nav>
          
            {/* <span role="img" aria-label="a tasty hamburger">🍔</span>
            Get Fed */} 
        
        </h1>
      </div>
    </header>
  );
}

export default Nav;
