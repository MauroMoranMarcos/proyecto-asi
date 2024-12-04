import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    items: null
};

const items = (state = initialState.items, action) => {

    switch (action.type) {

        default:
            return state;

    }

}

const reducer = combineReducers({
    items
});

export default reducer;