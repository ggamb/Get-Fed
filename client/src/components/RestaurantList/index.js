import React, { useEffect, useState } from 'react';
import RestaurantItem from '../RestaurantItem';
// import { useStoreContext } from '../../utils/GlobalState';

// import { idbPromise } from '../../utils/helpers';

function RestaurantList() {

  /*let [restaurantsArray, setRestaurantsArray] = useState([{
    restaurant_name: 'OhZone', restaurant_phone: '(240) 844-1198', restaurant_website: 'http://www.misterdwash.wix.com/ohzonelounge-', hours: 'Mon-Thu: 10am-2am Fri-Sun: 10am-3am', price_range: '$', restaurant_id: 3890038376985698

  },
  {
    restaurant_name: 'Turning Natural', restaurant_phone: '(202) 800-8828', restaurant_website: 'http:///dc/washington/665098-turning-natural/', hours: '', price_range: '', restaurant_id: 3890038376985703
  }]);*/

  let [restaurantsArray, setRestaurantsArray] = useState([]);

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
    var crd = pos.coords;

    let sampleRestaurantArray = [];

    /*fetch(`https://api.documenu.com/v2/restaurants/search/geo?lat=${crd.latitude}&lon=${crd.longitude}&distance=20&size=30&page=1&fullmenu=true&top_cuisines=false`, {
      "method": "GET",
      "headers": {
        "x-api-key": "b039ecf465ac2977b73b6de2f19b699b"
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
      });*/
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
    <div className="my-2">
      <h2>Our Restaurant:</h2>
      {restaurantsArray.length ? (
        <div className="flex-row">
          {restaurantsArray.map(restaurant => (
            <RestaurantItem
              key={restaurant.restaurant_id}
              _id={restaurant.restaurant_id}
              restaurant_name={restaurant.restaurant_name}
              price_range={restaurant.price_range}
            />
          ))}
        </div>
      ) : (
        <h3>Please turn on geolocation or use the search bar above!</h3>
      )}
    </div>
  );
}

export default RestaurantList;