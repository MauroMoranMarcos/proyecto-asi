import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    items: null
};

const items = (state = initialState.items, action) => {

    switch (action.type) {

        case actionTypes.CHECK_INVENTORY_COMPLETED:
            return action.items;

        case actionTypes.CLEAR_INVENTORY_SEARCH:
            return initialState.items;

        default:
            return state;

    }

}

const reducer = combineReducers({
    items
});

export default reducer;