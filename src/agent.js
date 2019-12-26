import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:8080';

const responseBody = res => res.body;
 let token = null;
const tokenPlugin = req => {
    if (token) {
        req.set('Authorization', `Bearer ${token}`);
    }
};


const requests = {
    get: url =>
    superagent
        .get(`${API_ROOT}${url}`)
        .use(tokenPlugin)
        .then(responseBody),
    post: (url, body) =>
    superagent
        .post(`${API_ROOT}${url}`, body)
        .use(tokenPlugin)
        .then(responseBody)
};


const Points = {
    currentpoints: () =>
        requests.get('/points/currentpoints'),
    update: (r) =>
        requests.get(`/points/update?r=${r}`),
    addpoint: (x, y, r) =>
        requests.post('/points', {x: x, y: y, r: r})
        
};

const Auth = {
    login: (username, password) =>
        requests.post('/users/signin', { username: username, password: password }),
    register: (username, password) =>
        requests.post('/users/signup', { username: username, password: password }),
};

export default {
    Points,
    Auth,
    setToken: _token => { token = _token; }
};
