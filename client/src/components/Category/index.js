import { useEffect } from "react";
import MenuItem from "../MenuItem";

function Category({ categoryDetail }) {

    useEffect(() => {
        console.log(categoryDetail);
    }, []);

    /*                    <MenuItem
                        key={category.name}
                        //_id={menuItem.item_id}
                        itemName={category.menu_item_list.name}
                    //itemPriceFloat={menuItem.menu_item_price}
                    //itemPriceString={menuItem.menu_item_pricing[0].priceString}
                    //category={menuItem.subsection}
                    //description={menuItem.menu_item_description}

                                {categoryDetail.categoryDetail.map(category => {
                <h2>{category.name}</h2>
            })}

                    />*/

    return (
        <>
            {categoryDetail.map(category => (
                <>
                    <div>
                        <h4 className="categories">{category.name}</h4>
                        <div className="flex-row center-content">
                            {category.menu_item_list.map(menuItems => (
                                <MenuItem
                                    _id={menuItems.product_id}
                                    itemName={menuItems.name}
                                    description={menuItems.description}
                                    itemPrice={(menuItems.price / 100).toFixed(2)}
                                />
                            ))}
                        </div>

                    </div>
                </>
            ))}
        </>
    )

}

export default Category;