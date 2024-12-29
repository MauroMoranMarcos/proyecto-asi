import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    order: null,
    orderDrafts: null,
};

const order = (state = initialState.order, action) => {

    switch (action.type) {

        default:
            return state;

    }

}

const orderDrafts = (state = initialState.orderDrafts, action) => {

    switch (action.type) {

        default:
            return state;

    }

}

const reducer = combineReducers({
    order,
    orderDrafts
});

export default reducer;