import React from "react";
//import Profile from "../assets/images/deshpl.jpg";
import Drink from "../assets/images/Drinkpack.jpg";







const Home = () => {

    let restaurantsArray = []

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        var crd = pos.coords;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);

        fetch(`https://api.documenu.com/v2/restaurants/search/geo?lat=${crd.latitude}&lon=${crd.longitude}&distance=20&size=30&page=1&fullmenu=true&top_cuisines=false`, {
            "method": "GET",
            "headers": {
                "x-api-key": "72237e122d5017b21a87f62f05c13053"
            }
        })
        .then(response => response.json())
        .then(restaurantData => {
            console.log(restaurantData);
            restaurantData.data.forEach(restaurant => {
                restaurantsArray.push(restaurant)
            });
        })
        .catch(err => {
            console.error(err);
        });
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);


    console.log('restraurants array', restaurantsArray);


    return (

        <div className="container">
            <div className="my-2">
            <img src={Drink} alt="Drink"></img>
            
                <h2>Our Products:</h2>
                {restaurantsArray.length ? (
                    <div className="flex-row">

                    </div>


                ) : (
                    <h3>Please enter your location or accept geolocation permissions!</h3>
                )}
                
            </div>
        </div>
    );
};

export default Home;
