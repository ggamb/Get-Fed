import React, { useEffect } from 'react';
import RestaurantItem from '../RestaurantItem';
// import { useStoreContext } from '../../utils/GlobalState';

// import { idbPromise } from '../../utils/helpers';

function RestaurantList() {

  let restaurantsArray = [];

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
    var crd = pos.coords;
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);

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
          restaurantsArray.push(restaurant);
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
              address={restaurant.address.formatted}
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