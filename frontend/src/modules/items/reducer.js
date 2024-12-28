import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    items: null,
    item: null,
    numItemBoxes: null,
    itemBoxes: null,
    supplier: null,
    suppliers: null,
    itemsFromSupplier: null,
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

        case actionTypes.FIND_ITEM_BY_ID_COMPLETED:
            return action.item;

        case actionTypes.CLEAR_ITEM:
            return initialState.item;

        default:
            return state;

    }

}

const numItemBoxes = (state = initialState.numItemBoxes, action) => {

    switch (action.type) {

        case actionTypes.COUNT_NUM_BOXES_OF_ITEM_ID_COMPLETED:
            return action.numItemBoxes;

        case actionTypes.CLEAR_NUM_ITEM_BOXES:
            return initialState.numItemBoxes;

        default:
            return state;

    }

}

const itemBoxes = (state = initialState.itemBoxes, action) => {

    switch (action.type) {

        case actionTypes.FIND_ALL_BOXES_OF_ITEM_ID_COMPLETED:
            return action.itemBoxes;

        case actionTypes.CLEAR_ITEM_BOXES:
            return initialState.itemBoxes;

        default:
            return state;

    }

}

const supplier = (state = initialState.supplier, action) => {

    switch (action.type) {

        case actionTypes.CREATE_SUPPLIER_COMPLETED:
            return action.supplierCreated;

        case actionTypes.FIND_SUPPLIER_BY_ID_COMPLETED:
            return action.supplier;

        case actionTypes.CLEAR_SUPPLIER:
            return initialState.supplier;

        default:
            return state;

    }

}

const suppliers = (state = initialState.suppliers, action) => {

    switch (action.type) {

        case actionTypes.FIND_ALL_SUPPLIERS_COMPLETED:
            return action.suppliers;

        default:
            return state;

    }

}

const itemsFromSupplier = (state = initialState.itemsFromSupplier, action) => {

    switch (action.type) {

        case actionTypes.FIND_ITEMS_FROM_SUPPLIER_COMPLETED:
            return action.itemsFromSupplier;

        case actionTypes.CLEAR_FIND_ITEMS_FROM_SUPPLIER:
            return initialState.itemsFromSupplier;

        default:
            return state;

    }

}

const reducer = combineReducers({
    items,
    item,
    numItemBoxes,
    itemBoxes,
    supplier,
    suppliers,
    itemsFromSupplier
});

export default reducer;