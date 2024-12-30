import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    order: null,
    orders: null,
    orderBoxes: null,
};

const order = (state = initialState.order, action) => {

    switch (action.type) {

        case actionTypes.FIND_ORDER_BY_ID_COMPLETED:
            return action.order;

        case actionTypes.CLEAR_ORDER:
            return initialState.order;

        case actionTypes.CREATE_ORDER_COMPLETED:
            return action.order;

        default:
            return state;

    }

}

const orders = (state = initialState.orders, action) => {

    switch (action.type) {

        case actionTypes.FIND_ORDER_DRAFTS_COMPLETED:
            return action.orderDrafts;

        case actionTypes.CLEAR_ORDER_DRAFTS:
            return initialState.orders;

        case actionTypes.FIND_ORDERS_SENT_TO_ADMINS:
            return action.ordersSentToAdmins;

        case actionTypes.CLEAR_ORDERS_SENT_TO_ADMINS:
            return initialState.orders;

        default:
            return state;

    }

}

const orderBoxes = (state = initialState.orderBoxes, action) => {

    switch (action.type) {

        case actionTypes.ADD_BOX_TO_ORDER_COMPLETED:
            return action.orderBoxes;

        case actionTypes.FIND_BOXES_FROM_ORDER_COMPLETED:
            return action.orderBoxes;

        case actionTypes.UPDATE_NUMBER_OF_BOXES_IN_ORDER_COMPLETED:
            return action.orderBoxes;

        case actionTypes.DELETE_BOX_FROM_ORDER_COMPLETED:
            return action.orderBoxes;

        default:
            return state;

    }

}

const reducer = combineReducers({
    order,
    orders,
    orderBoxes
});

export default reducer;