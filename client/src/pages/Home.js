import React from "react";
import RestaurantList from '../components/RestaurantList';
import HomeImage from "../assets/images/pretty_bg.jpg"; 
import { Link } from "react-router-dom";

const Home = () => {
    return (
       // <div className="container" style={{ backgroundImage: `url(${HomeImage})` }}>
<div className="Home" style={{ backgroundImage: `url(${HomeImage})` }}>

// <RestaurantList></RestaurantList> 

<div className="headerContainer">

       
<Link to="/Login"> <button> ORDER NOW  </button> </Link>
          
         
      </div>



        </div>
    );
};
export default Home;
