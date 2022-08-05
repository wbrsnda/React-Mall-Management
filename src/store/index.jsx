import { createStore,combineReducers,compose,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import product from './reducers/product';
import notice from './reducers/notice';
import user from './reducers/user';
import order from './reducers/order';
import productCategory from './reducers/productCategory';
import screening from './reducers/screening';

const rootReducer = combineReducers({
    product,//produc:product
    notice,
    user,
    order,
    productCategory,
    screening
});

export default createStore(rootReducer,compose(applyMiddleware(...[thunk])));