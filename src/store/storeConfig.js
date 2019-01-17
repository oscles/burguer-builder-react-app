import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';

import burgerBuilderReducer from './reducers/burgerBuilder';
import orderReducer from './reducers/order';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer
});

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);