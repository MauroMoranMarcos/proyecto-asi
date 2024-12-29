import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    order: null,
    orderDrafts: null,
};

const order = (state = initialState.order, action) => {

    switch (action.type) {

        case actionTypes.FIND_ORDER_BY_ID_COMPLETED:
            return action.order;

        case actionTypes.CLEAR_ORDER:
            return initialState.order;

        default:
            return state;

    }

}

const orderDrafts = (state = initialState.orderDrafts, action) => {

    switch (action.type) {

        case actionTypes.FIND_ORDER_DRAFTS_COMPLETED:
            return action.orderDrafts;

        case actionTypes.CLEAR_ORDER_DRAFTS:
            return initialState.orderDrafts;

        default:
            return state;

    }

}

const reducer = combineReducers({
    order,
    orderDrafts
});

export default reducer;