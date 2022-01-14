import React from "react";
import RestaurantList from '../components/restaurant-list';

const Home = () => {
    return (
        <div className="container">
            <div className="flex-row">
                <RestaurantList></RestaurantList>
            </div>
        </div>
    );
};

export default Home;
