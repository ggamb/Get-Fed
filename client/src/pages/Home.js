import React from "react";
import RestaurantList from '../components/RestaurantList';

const Home = () => {
    return (

        <section className="hero">
            <div className="container">
                <div className="my-2">
                    <h2>Our Products:</h2>
                    {restaurantsArray.length ? (
                        <div className="flex-row">

                        </div>
                    ) : (
                        <h3>Please enter your location or accept geolocation permissions!</h3>
                    )}
                    
                </div>
            </div>
        </section>
    );
};

export default Home;
