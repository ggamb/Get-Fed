import React from "react";


function MenuItem(menuItem) {
    const {
        _id,
        itemName,
        itemPrice,
        category
    } = menuItem;

    return (
        <div className="card px-1 py-1">
            <div>
                <p>{itemName}</p>
                <p>{itemPrice}</p>
                <p>{category}</p>
            </div>
            <button>Add to cart</button>
        </div>
    );


}

export default MenuItem;