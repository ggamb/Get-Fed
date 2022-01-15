import React, { useEffect } from 'react';

import React from "react";



function Menu () {
    const resturants = 0
  return (
    <div>
        <h1>Select your items</h1>
        {resturants.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default Menu;
