import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import { middleware } from "../navigation/navigate";
import createSagaMiddleware from "redux-saga";
import {productWatchers} from "../sagas/product";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    {
      productState: { 
        products: [],
        isLoading: false,
        filteredProducts:[],
    }
    },
    applyMiddleware(middleware, sagaMiddleware)
  );

sagaMiddleware.run(productWatchers);

export default store;