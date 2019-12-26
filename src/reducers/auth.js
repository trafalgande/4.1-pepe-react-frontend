import {
    LOGIN,
    REGISTER,
    ASYNC_START,
    UPDATE_FIELD_AUTH
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOGIN:
        case REGISTER:
            return {
                ...state,
                inProgress: false,
                errors: action.error ? action.payload.message : null
            };
        case ASYNC_START:
            if (action.subtype === 'LOGIN' || action.subtype === 'REGISTER') {
                return { ...state, inProgress: true };
            }
            return state;
        case UPDATE_FIELD_AUTH:
            return { ...state, [action.key]: action.value };
        default:
            return state;
    }
};
