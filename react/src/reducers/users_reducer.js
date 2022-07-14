import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const _nullUser = Object.freeze({
    currentUser: null,
});

const usersReducer = (oldState = {}, action) => {

    Object.freeze(oldState);

    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, { [action.currentUser.id]: action.currentUser });
        default:
            return oldState;
    }
};

export default usersReducer;
