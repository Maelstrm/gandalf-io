import { combineReducers } from 'redux';

const shelfReducer = (state = [], action) => {
    if(action.type === 'SET_SHELF'){
        return action.payload;
    }
    return state;
}

export default combineReducers({
    shelfReducer,
});