import React from "react";
import Jumbotron from "../components/Jumbotron";
import RestaurantList from '../components/RestaurantList';
const Home = () => {
    return (
        <div className="home">
                    <Jumbotron></Jumbotron>

            <RestaurantList></RestaurantList>
        </div>
    );
};
export default Home;