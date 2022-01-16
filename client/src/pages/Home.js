import React from "react";
//import Profile from "../assets/images/deshpl.jpg";
import Drink from "../assets/images/pretty_bg.jpg";
import "../styles/Home.css";



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


       <div className="container" style={{ backgroundImage: `url(${Drink})` }}>

        <div className="headerContainer" >
    
            </div>
            </div>

       
        
        
    );
};
export default Home;
