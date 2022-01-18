import React from "react";
import { Link } from "react-router-dom";
// import { pluralize } from "../../utils/helpers"
// import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
// import { idbPromise } from "../../utils/helpers";
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, ListGroup, ListGroupItem
} from 'reactstrap';


function RestaurantItem(restaurantDetail) {
  // const [state, dispatch] = useStoreContext();

  const {
    restaurant_name,
    _id,
    price_range,
    address,
    hours
  } = restaurantDetail;

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
    <Card border="primary">
      <CardBody>
        <CardTitle>
          <Link to={`/restaurant/${_id}`}>
            <p>{restaurant_name}</p>
          </Link>
        </CardTitle>
        <ListGroup>
          <ListGroupItem>Price: {price_range}</ListGroupItem>
          <ListGroupItem>Address: <span>{address}</span></ListGroupItem>
          <ListGroupItem>Hours: <span>{hours}</span></ListGroupItem>
      </ListGroup>
    </CardBody>
    </Card >
  );
}

export default RestaurantItem;