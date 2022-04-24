import { useStoreContext } from "../../utils/GlobalState";
import { TOGGLE_FILTERED, CLEAR_FILTER } from "../../utils/actions";

const Filters = ({filtersList}) => {

    const [state, dispatch] = useStoreContext();

    const filterRestaurants = (e) => {
        let categoryToFilter = e.target.textContent;
    
        dispatch({type: TOGGLE_FILTERED, filteredCategory: categoryToFilter})
    };

    const clearFilter = (e) => {
        dispatch({type: CLEAR_FILTER})
    }


    return (
        <>
            <div className="flex-row center-content">
                {filtersList.map(filter => (
                    <button className="filters-style" onClick={filterRestaurants}>{filter.name}</button>
                ))}
                <span><button className="filters-style" onClick={clearFilter}>❌Clear filter</button></span>
            </div>
            
        </>
    )

}

export default Filters;