import App from './component/App';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import store from "./store";
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Login from './component/Login';
import Register from "./component/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './component/Main';

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Main} />
                <Route path="signin" component={Login} />
                <Route path="signup" component={Register} />
            </Route>
        </Router>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
