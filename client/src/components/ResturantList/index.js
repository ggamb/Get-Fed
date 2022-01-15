import React, { useEffect } from 'react';
import RestaurantItem from '../RestaurantItem';
// import { useStoreContext } from '../../utils/GlobalState';

// import { idbPromise } from '../../utils/helpers';


function RestaurantList(restaurants) {
  

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

  return (
    <div className="my-2">
      <h2>Our Restaurant:</h2>
      {restaurants.length ? (
        <div className="flex-row">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.restaurant_id}
              _id={restaurant.restaurant_id}
              restaurant_name={restaurant.restaurant_name}
              price_range={restaurant.price_range}
              address= {restaurant.address.formatted}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any orders yet!</h3>
      )}
    </div>
  );
}

export default RestaurantList;