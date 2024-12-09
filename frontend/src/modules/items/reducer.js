import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    items: null,
    item: null
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

const item = (state = initialState.item, action) => {

    switch (action.type) {

        case actionTypes.FIND_ITEM_BOX_BY_ID_COMPLETED:
            return action.item;

        case actionTypes.CLEAR_ITEM:
            return initialState.item;

        default:
            return state;

    }

}

const reducer = combineReducers({
    items,
    item
});

export default reducer;