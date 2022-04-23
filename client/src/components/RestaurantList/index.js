import React, { useEffect, useState, useRef } from 'react';
import RestaurantItem from '../RestaurantItem';
// import { useStoreContext } from '../../utils/GlobalState';
import { Button } from 'reactstrap';
// import { idbPromise } from '../../utils/helpers';
const axios = require("axios");
import Filters from '../Filters';
import { useStoreContext } from "../../utils/GlobalState";

function RestaurantList() {

  const [state] = useStoreContext();

  const textInput = useRef(null);
  let searchText = null;
  let sampleRestaurantArray = [];
  const apiKey = process.env.REACT_APP_API_MEALME;

  let [restaurantsArray, setRestaurantsArray] = useState([]);


  /*let [restaurantsArray, setRestaurantsArray] = useState([{
    restaurant_name: 'OhZone', restaurant_phone: '(240) 844-1198', restaurant_website: 'http://www.misterdwash.wix.com/ohzonelounge-', hours: 'Mon-Thu: 10am-2am Fri-Sun: 10am-3am', price_range: '$', restaurant_id: 3890038376985698, cuisines: ['Bar Food']

  },
  {
    restaurant_name: 'Turning Natural', restaurant_phone: '(202) 800-8828', restaurant_website: 'http:///dc/washington/665098-turning-natural/', hours: '', price_range: '', restaurant_id: 3890038376985703, cuisines: ['American']
  }]);*/

  function handleClick() {
    searchText = textInput.current.value;

    textInput.current.value = '';

    /*if (isNaN(searchText)) {
      //Search is a string so assumed to be a search for a state

      //Passes search text to function to change state name to abbreviation for API fetch
      let stateCode = abbrState(searchText, 'abbr');

      fetch(`https://api.documenu.com/v2/restaurants/state/${stateCode}?size=30&page=1&fullmenu=true`, {
        "method": "GET",
        "headers": {
          "x-api-key": apiKey
        }
      })
        .then(response => response.json())
        .then(restaurantData => {
          restaurantData.data.forEach(restaurant => {
            sampleRestaurantArray.push(restaurant);
          });

          setRestaurantsArray(sampleRestaurantArray);
        })
        .catch(err => {
          console.error(err);
        });

    } else {
      //Search is an int so assumed to be a search by zip code

      fetch(`https://api.documenu.com/v2/restaurants/zip_code/${searchText}?size=30&page=1&fullmenu=true`, {
        "method": "GET",
        "headers": {
          "x-api-key": apiKey
        }
      })
        .then(response => response.json())
        .then(restaurantData => {
          console.log(restaurantData)
          restaurantData.data.forEach(restaurant => {
            sampleRestaurantArray.push(restaurant);
          });

          setRestaurantsArray(sampleRestaurantArray);
        })
        .catch(err => {
          console.error(err);
        });
    }*/

  }

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
    let crd = pos.coords;

    const options = {
      method: 'GET',
      url: 'https://mealme.p.rapidapi.com/restaurants/search/store',
      params: {
        latitude: crd.latitude,
        longitude: crd.longitude,
        sort: 'relevance',
        maximum_miles: '3'
      },
      headers: {
        'X-RapidAPI-Host': 'mealme.p.rapidapi.com',
        'X-RapidAPI-Key': apiKey
      }
    };

    axios.request(options).then(response => {
      console.log(response.data.restaurants);
      response.data.restaurants.forEach(restaurant => {
        sampleRestaurantArray.push(restaurant);
      });

      setRestaurantsArray(sampleRestaurantArray);

    }).catch(function (error) {
      console.error(error);
    });

  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [])

  const formatPhoneNum = (phoneNumber) => {
    return `(${phoneNumber.toString().slice(1, 4)})-${phoneNumber.toString().slice(4, 7)}-${phoneNumber.toString().slice(7, 11)}`;
  }

  const formatToDollarSign = (dollarSigns) => {
    let returnDollars = '';

    while (dollarSigns < 0) {
      returnDollars += '$'
    }

    return returnDollars;
  }

  const formatHours = (hoursObject) => {
    let hoursString = '';

    for (let days in hoursObject) {
      hoursString += days + ': ' + hoursObject[days] + '\n' ;
    }

    return hoursString;
  }

  const filtersList = [
    { name: 'Mexican' },
    { name: 'American' },
    { name: 'Italian' },
    { name: 'Chinese' },
    { name: 'Indian' },
    { name: 'Fast Food' },
    { name: 'Breakfast' },
    { name: 'Sandwich' },
    { name: 'Burgers' },
    { name: 'Dessert' },
    { name: 'Seafood' },
    { name: 'Vegetarian' },
    { name: 'Vegan' },
  ];

  return (
    <>
      {/* Search bar to be reimplemented with new API
      
      <div>
        <input id="searchBar" type="text" placeholder="Search by zipcode or state" ref={textInput}></input>
        <Button color='primary' size='sm' onClick={handleClick}>Search</Button>
  </div>*/}

      <h1>Choose from the following restaurants!</h1>
      <p>Filters:</p>
      <Filters filtersList={filtersList}></Filters>
      <div className="my-2">
        {
          state.filtered && restaurantsArray.length ? (
            <div className='flex-row center-content'>
              {restaurantsArray.filter(restaurant => restaurant.cuisines.includes(state.filteredCategory)).map(filteredRestaurants => (
                <RestaurantItem
                  key={filteredRestaurants._id}
                  _id={filteredRestaurants._id}
                  quoteID={filteredRestaurants.quote_ids}
                  restaurant_name={filteredRestaurants.name}
                  address={filteredRestaurants.address.street_addr}
                  price_range={formatToDollarSign(filteredRestaurants.dollar_signs)}
                  cuisines={filteredRestaurants.cuisines}
                  hours={formatHours(filteredRestaurants.local_hours.dine_in)}
                  phoneNumber={formatPhoneNum(filteredRestaurants.phone_number)}
                  website={filteredRestaurants.restaurant_website}
                  distance={filteredRestaurants.miles}
                  rating={filteredRestaurants.weighted_rating_value}
                  photo={filteredRestaurants.logo_photos[0]}
                />
              ))}
            </div>
          ) : restaurantsArray.length ? (
            <div className='flex-row center-content'>
              {restaurantsArray.map(restaurant => (
                <RestaurantItem
                  key={restaurant._id}
                  _id={restaurant._id}
                  address={restaurant.address.street_addr}
                  restaurant_name={restaurant.name}
                  price_range={formatToDollarSign(restaurant.dollar_signs)}
                  cuisines={restaurant.cuisines}
                  hours={formatHours(restaurant.local_hours.dine_in)}
                  phoneNumber={formatPhoneNum(restaurant.phone_number)}
                  website={restaurant.restaurant_website}
                  distance={restaurant.miles}
                  rating={restaurant.weighted_rating_value}
                  photo={restaurant.logo_photos[0]}
                  quoteID={restaurant.quote_ids}
                />
              ))}
            </div>
          ) : (
            <h3>Please turn on geolocation or use the search bar above!</h3>
          )
        }
      </div>
    </>
  );
}

export default RestaurantList;