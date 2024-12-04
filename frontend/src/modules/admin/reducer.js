import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    warehouse: null,
};

const warehouse = (state = initialState.warehouse, action) => {

    switch (action.type) {

        default:
            return state;

    }

}

const reducer = combineReducers({
    warehouse
});

export default reducer;