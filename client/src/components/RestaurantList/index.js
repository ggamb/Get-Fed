import React, { useEffect, useState, useRef } from 'react';
import RestaurantItem from '../RestaurantItem';
// import { useStoreContext } from '../../utils/GlobalState';
import { Button } from 'reactstrap';
// import { idbPromise } from '../../utils/helpers';

function RestaurantList() {

  const textInput = useRef(null);
  let searchText = null;
  let sampleRestaurantArray = [];
  const apiKey = process.env.REACT_APP_API;

  let [restaurantsArray, setRestaurantsArray] = useState([]);

  function abbrState(input, to) {

    var states = [
      ['Arizona', 'AZ'],
      ['Alabama', 'AL'],
      ['Alaska', 'AK'],
      ['Arkansas', 'AR'],
      ['California', 'CA'],
      ['Colorado', 'CO'],
      ['Connecticut', 'CT'],
      ['Delaware', 'DE'],
      ['Florida', 'FL'],
      ['Georgia', 'GA'],
      ['Hawaii', 'HI'],
      ['Idaho', 'ID'],
      ['Illinois', 'IL'],
      ['Indiana', 'IN'],
      ['Iowa', 'IA'],
      ['Kansas', 'KS'],
      ['Kentucky', 'KY'],
      ['Louisiana', 'LA'],
      ['Maine', 'ME'],
      ['Maryland', 'MD'],
      ['Massachusetts', 'MA'],
      ['Michigan', 'MI'],
      ['Minnesota', 'MN'],
      ['Mississippi', 'MS'],
      ['Missouri', 'MO'],
      ['Montana', 'MT'],
      ['Nebraska', 'NE'],
      ['Nevada', 'NV'],
      ['New Hampshire', 'NH'],
      ['New Jersey', 'NJ'],
      ['New Mexico', 'NM'],
      ['New York', 'NY'],
      ['North Carolina', 'NC'],
      ['North Dakota', 'ND'],
      ['Ohio', 'OH'],
      ['Oklahoma', 'OK'],
      ['Oregon', 'OR'],
      ['Pennsylvania', 'PA'],
      ['Rhode Island', 'RI'],
      ['South Carolina', 'SC'],
      ['South Dakota', 'SD'],
      ['Tennessee', 'TN'],
      ['Texas', 'TX'],
      ['Utah', 'UT'],
      ['Vermont', 'VT'],
      ['Virginia', 'VA'],
      ['Washington', 'WA'],
      ['West Virginia', 'WV'],
      ['Wisconsin', 'WI'],
      ['Wyoming', 'WY'],
    ];

    if (to == 'abbr') {
      input = input.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
      for (let i = 0; i < states.length; i++) {
        if (states[i][0] == input) {
          return (states[i][1]);
        }
      }
    } else if (to == 'name') {
      input = input.toUpperCase();
      for (let i = 0; i < states.length; i++) {
        if (states[i][1] == input) {
          return (states[i][0]);
        }
      }
    }
  }

  /*let [restaurantsArray, setRestaurantsArray] = useState([{
    restaurant_name: 'OhZone', restaurant_phone: '(240) 844-1198', restaurant_website: 'http://www.misterdwash.wix.com/ohzonelounge-', hours: 'Mon-Thu: 10am-2am Fri-Sun: 10am-3am', price_range: '$', restaurant_id: 3890038376985698, cuisines: ['Bar Food']

  },
  {
    restaurant_name: 'Turning Natural', restaurant_phone: '(202) 800-8828', restaurant_website: 'http:///dc/washington/665098-turning-natural/', hours: '', price_range: '', restaurant_id: 3890038376985703, cuisines: ['American']
  }]);*/

  function handleClick() {
    searchText = textInput.current.value;

    if (isNaN(searchText)) {
      //Search is a string so assumed to be a search for a state
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
      console.log(searchText);

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
    }

  }

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
    var crd = pos.coords;

    fetch(`https://api.documenu.com/v2/restaurants/search/geo?lat=${crd.latitude}&lon=${crd.longitude}&distance=20&size=30&page=1&fullmenu=true&top_cuisines=false`, {
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
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [])


  console.log('restraurants array', restaurantsArray);

  //   const { currentCategory } = state;


  //   useEffect(() => {
  //     if (data) {
  //       dispatch({
  //         type: UPDATE_PRODUCTS,
  //         products: data.products,
  //       });
  //       data.products.forEach((product) => {
  //         idbPromise('products', 'put', product);
  //       });
  //     } else if (!loading) {
  //       idbPromise('products', 'get').then((products) => {
  //         dispatch({
  //           type: UPDATE_PRODUCTS,
  //           products: products,
  //         });
  //       });
  //     }
  //   }, [data, loading, dispatch]);

  //   function filterProducts() {
  //     if (!currentCategory) {
  //       return state.products;
  //     }

  //     return state.products.filter(
  //       (product) => product.category._id === currentCategory
  //     );
  //   }

  /**/

  return (
    <>
      <div>
        <input id="searchBar" type="text" placeholder="Search by zipcode or state" ref={textInput}></input>
        <Button color='primary' size='sm' onClick={handleClick}>Search</Button>
      </div>
      <div className="my-2">
        <h2>Choose from the following restaurants!</h2>
        {restaurantsArray.length ? (
          <div className='flex-row'>
            {restaurantsArray.map(restaurant => (
              <RestaurantItem
                key={restaurant.restaurant_id}
                _id={restaurant.restaurant_id}
                address={restaurant.address.formatted}
                restaurant_name={restaurant.restaurant_name}
                price_range={restaurant.price_range}
                cuisines={restaurant.cuisines}
                hours={restaurant.hours}
                phoneNumber={restaurant.restaurant_phone}
                website={restaurant.restaurant_website}
              />
            ))}
          </div>
        ) : (
          <h3>Please turn on geolocation or use the search bar above!</h3>
        )}
      </div>
    </>
  );
}

export default RestaurantList;