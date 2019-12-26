import agent from './agent';
import {
    POINT_ADDED,
    POINTS_LOADED,
    LOGIN,
    LOGOUT
} from './actions/types';

const promiseMiddleware = store => next => action => {
    if (isPromise(action.payload)) {
        store.dispatch({ type: 'ASYNC_START', subtype: action.type });
        action.payload.then(
            res => {
                action.payload = res;
                store.dispatch(action);
            },
            error => {
                action.error = true;
                action.payload = error.responce;
                store.dispatch(action);
            }
        );

        return;
    }
    next(action);
};

function isPromise(v) {
    return v && typeof v.then === 'function';
}

const pointsMiddleware = store => next => action => {

    switch (action.type) {
        case POINTS_LOADED:
            if (action.error) {
                window.localStorage.removeItem('token');
                window.localStorage.removeItem('username');
                agent.setToken(null);
            }
            break;
        case POINT_ADDED:
            if (!action.error) {
                store.dispatch({ type: 'POINTS_LOADED', payload: agent.Points.currentpoints() });
                store.dispatch({ type: 'POINTS_RECALCULATED', payload: agent.Points.update(action.r), r: action.r});
            }
            break;
        default:
            break;
    }
    next(action);
};


const authMiddleware = store => next => action => {

    switch (action.type) {
        case LOGIN:
            if (!action.error) {
                window.localStorage.setItem('token', action.payload.message);
                window.localStorage.setItem('username', action.username);
                agent.setToken(action.payload.message);
                console.log(window.localStorage)
            }
            break;
        case LOGOUT:
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('username');
            agent.setToken(null);
            break;
        default:
            break;
    }

    next(action);
};


export {
    authMiddleware,
    pointsMiddleware,
    promiseMiddleware,
    
};
