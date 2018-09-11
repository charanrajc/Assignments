import {
    combineReducers
} from "redux";
import productReducer from "./product";
import {
    createNavigationReducer
} from "react-navigation-redux-helpers";
import {AppNavigator} from "../navigation/navigate";


const navReducer = createNavigationReducer(AppNavigator);

const rootReducer = combineReducers({
    productState: productReducer,
    navState: navReducer
})

export default rootReducer;