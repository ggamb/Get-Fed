import React, { useEffect } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function MenuItem(menuItem) {
  const [state, dispatch] = useStoreContext();

  const { _id, itemName, itemPriceString, itemPriceFloat, category } = menuItem;
  let { description } = menuItem;
  //console.log("Menu Item", menuItem);
  const { cart } = state;


  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  description = capitalizeFirstLetter(description);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...menuItem, purchaseQuantity: 1 }
      });
      // idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  const moveToLogin = () => {

  }

  return (
    <>
      <Card color="light" className="card-style">
        <CardBody>
          <CardTitle tag='h5'>
            {itemName}
          </CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {category ? (
              <>{category}</>
            ) : null}
          </CardSubtitle>
          <CardText>
            <p>{itemPriceString}</p>
            <p className="last-menu-item">{description}</p>
          </CardText>
        </CardBody>

        {Auth.loggedIn() ? (
          <Button
            className="menu-button"
            active
            block
            color="primary"
            size="sm"
            onClick={addToCart}>
            Add to order
          </Button>
        ) :

          <Link to="/login" className="signup-link">
            <Button
              block
              color="warning"
              size="sm">
              Sign in to add to cart!
            </Button>
          </Link>

        }

      </Card>
    </>
  );
};


export default MenuItem;