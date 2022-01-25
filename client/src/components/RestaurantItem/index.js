import React from "react";
import { Link } from "react-router-dom";
// import { pluralize } from "../../utils/helpers"
// import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
// import { idbPromise } from "../../utils/helpers";
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, ListGroup, ListGroupItem, List
} from 'reactstrap';


function RestaurantItem(restaurantDetail) {

  //Destructures data from restaurantDetail param
  const {
    restaurant_name,
    _id,
    price_range,
    address,
    hours,
    cuisines,
    phoneNumber,
    website
  } = restaurantDetail;

  //Adds commas to cuisines to be displayed
  let cuisinesString = '';
  
  if (cuisines[0] !== '') {
    for (let i = 0; i < cuisines.length; i++) {
      if (i < cuisines.length - 1) {
        cuisinesString += cuisines[i] + ", ";
      } else {
        cuisinesString += cuisines[i];
      }
    }
  }

  //Some API website data is not valid. Regex below ensures that URL is valid for display on webpage
  function isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  };

  // const { cart } = state

  // const addToCart = () => {
  //   const itemInCart = cart.find((cartItem) => cartItem._id === _id)
  //   if (itemInCart) {
  //     dispatch({
  //       type: UPDATE_CART_QUANTITY,
  //       _id: _id,
  //       purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
  //     });
  //     idbPromise('cart', 'put', {
  //       ...itemInCart,
  //       purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
  //     });
  //   } else {
  //     dispatch({
  //       type: ADD_TO_CART,
  //       product: { ...item, purchaseQuantity: 1 }
  //     });
  //     idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
  //   }
  // }

  return (
    <>
      <Card color="light" className="card-style">
        <CardBody>
          <CardTitle tag='h5'>
            <Link className="restaurant-link" to={`/restaurant/${_id}`}>
              {restaurant_name}
            </Link>
          </CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {cuisines[0] !== '' ? (
              <>Cuisine: {cuisinesString}</>
            ) : null}
          </CardSubtitle>
          <ListGroup className="restaurant-list-group">

            {address ? (
              <ListGroupItem><p className="restaurant-header">Address:</p> {address}</ListGroupItem>
            ) : null}

            {phoneNumber ? (
              <ListGroupItem><p className="restaurant-header">Number:</p>{phoneNumber}</ListGroupItem>
            ) : null}

            {website && isValidURL(website) ? (
              <ListGroupItem><a href={website} target="_blank">Website</a></ListGroupItem>
            ) : null}

            {hours ? (
              <ListGroupItem><p className="restaurant-header">Hours:</p>{hours}</ListGroupItem>
            ) : null}

            {price_range ? (
              <ListGroupItem><p className="restaurant-header">Price:</p> {price_range}</ListGroupItem>
            ) : null}
          </ListGroup>
        </CardBody>
      </Card >
    </>
  );
}

export default RestaurantItem;