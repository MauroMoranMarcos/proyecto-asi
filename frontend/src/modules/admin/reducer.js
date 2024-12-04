import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    warehouse: null,
    warehouses: null,
};

const warehouse = (state = initialState.warehouse, action) => {

    switch (action.type) {

        case actionTypes.CREATE_WAREHOUSE_COMPLETED:
            return action.warehouseCreated;

        default:
            return state;

    }

}

const warehouses = (state = initialState.warehouses, action) => {

    switch (action.type) {

        case actionTypes.FIND_ALL_WAREHOUSES_COMPLETED:
            return action.warehouses;

        default:
            return state;

    }

}

const reducer = combineReducers({
    warehouse,
    warehouses
});

export default reducer;