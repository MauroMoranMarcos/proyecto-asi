import * as actionTypes from './actionTypes';
import backend from '../../backend';

const addItemBoxToWarehouseCompleted = () => ({
    type: actionTypes.ADD_ITEM_BOX_TO_WAREHOUSE_COMPLETED,
});

export const addItemBoxToWarehouse = (formData, onSuccess, onErrors) => dispatch =>
    backend.itemsService.addItemBoxToWarehouse(formData,
        () => {
            dispatch(addItemBoxToWarehouseCompleted());
            onSuccess();
        },
        onErrors);

const checkInventoryCompleted = items => ({
    type: actionTypes.CHECK_INVENTORY_COMPLETED,
    items
});

const clearInventorySearch = () => ({
    type: actionTypes.CLEAR_INVENTORY_SEARCH
});

export const checkInventory = (criteria) => dispatch => {

    dispatch(clearInventorySearch());
    backend.itemsService.checkInventory(criteria,
        result => dispatch(checkInventoryCompleted({criteria, result})));

}

export const previousCheckInventoryResultPage = (criteria) =>
    checkInventory({...criteria, page: criteria.page - 1});

export const nextCheckInventoryResultPage = (criteria) =>
    checkInventory({...criteria, page: criteria.page + 1});