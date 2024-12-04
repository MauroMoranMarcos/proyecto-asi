import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    warehouse: null,
    allWarehouses: null,
};

const warehouse = (state = initialState.warehouse, action) => {

    switch (action.type) {

        case actionTypes.CREATE_WAREHOUSE_COMPLETED:
            return action.warehouse;

        default:
            return state;

    }

}

const allWarehouses = (state = initialState.allWarehouses, action) => {

    switch (action.type) {

        case actionTypes.FIND_ALL_WAREHOUSES_COMPLETED:
            return action.allWarehouses;

        default:
            return state;

    }

}

const reducer = combineReducers({
    warehouse,
    allWarehouses
});

export default reducer;