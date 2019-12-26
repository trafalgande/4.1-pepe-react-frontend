import { applyMiddleware, createStore, combineReducers } from 'redux';
import {authMiddleware, pointsMiddleware, promiseMiddleware} from './middleware';
import auth from './reducers/auth';
import common from './reducers/common';
import home from './reducers/home';


const reducers = combineReducers({
    auth,
    common,
    home
});

const middleware = applyMiddleware(promiseMiddleware, authMiddleware, pointsMiddleware);

const store = createStore(reducers, middleware);

export default store;
