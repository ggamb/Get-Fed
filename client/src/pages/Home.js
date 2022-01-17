import React from "react";
import RestaurantList from '../components/RestaurantList';
import Cart from '../components/Cart';

const Home = () => {
    return (
        <div className="container">
            <Cart></Cart>
            <RestaurantList></RestaurantList>
            
        </div>
    );
};

export default Home;
