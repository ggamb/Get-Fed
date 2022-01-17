import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function MenuItem(menuItem) {
  const [state, dispatch] = useStoreContext();

  const { _id, itemName, itemPrice, category } = menuItem;

  const { cart } = state;

  // const addToCart = () => {
  //   const itemInCart = cart.find((cartItem) => cartItem._id === _id);
  //   if (itemInCart) {
  //     dispatch({
  //       type: UPDATE_CART_QUANTITY,
  //       _id: _id,
  //       purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
  //     });
  //     idbPromise("cart", "put", {
  //       ...itemInCart,
  //       purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
  //     });
  //   } else {
  //     dispatch({
  //       type: ADD_TO_CART,
  //       product: { ...item, purchaseQuantity: 1 },
  //     });
  //     idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
  //   }

    return (
      <div className="card px-1 py-1">
        <div>
          <p>{itemName}</p>
          <p>{itemPrice}</p>
          <p>{category}</p>
        </div>
        <button  >Add to cart</button>
      </div>
    );
   };
// }
export default MenuItem;
