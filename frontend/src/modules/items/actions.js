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

const findItemBoxByIdCompleted = item => ({
    type: actionTypes.FIND_ITEM_BOX_BY_ID_COMPLETED,
    item
});

export const findItemBoxById = (itemBoxId) => dispatch => {
    backend.itemsService.findItemBoxById(itemBoxId,
        item => {
            dispatch(findItemBoxByIdCompleted(item));
        });
}

export const clearItem = () => ({
    type: actionTypes.CLEAR_ITEM
});

const countNumBoxesOfItemBoxIdCompleted = numBoxes => ({
    type: actionTypes.COUNT_NUM_BOXES_OF_ITEM_BOX_ID_COMPLETED,
    numBoxes
});

export const countNumBoxesOfItemBoxId = (itemBoxId, onSuccess, onErrors) => dispatch => {
    backend.itemsService.countNumBoxesOfItemBoxId(itemBoxId,
        numBoxes => {
            dispatch(countNumBoxesOfItemBoxIdCompleted(numBoxes));
            onSuccess(numBoxes);
        },
        onErrors);
}

const findAllBoxesOfItemBoxIdCompleted = numBoxes => ({
    type: actionTypes.FIND_ALL_BOXES_OF_ITEM_BOX_ID_COMPLETED,
    numBoxes
});

export const findAllBoxesOfItemBoxId = (itemBoxId, onSuccess, onErrors) => dispatch => {
    backend.itemsService.findAllBoxesOfItemBoxId(itemBoxId,
        boxes => {
            dispatch(findAllBoxesOfItemBoxIdCompleted(boxes));
            onSuccess(boxes);
        },
        onErrors);
}

const deleteItemCompleted = () => ({
    type: actionTypes.DELETE_ITEM_COMPLETED,
});

export const deleteItem = (itemBoxId, onSuccess, onErrors) => dispatch =>
    backend.itemsService.deleteItem(itemBoxId,
        () => {
            dispatch(deleteItemCompleted());
            onSuccess();
        },
        onErrors);

const modifyItemCompleted = () => ({
    type: actionTypes.MODIFY_ITEM_COMPLETED,
});

export const modifyItem = (itemBoxId, formData, onSuccess, onErrors) => dispatch =>
    backend.itemsService.modifyItem(itemBoxId, formData,
        () => {
            dispatch(modifyItemCompleted());
            onSuccess();
        },
        onErrors);

const modifyItemBoxCompleted = () => ({
    type: actionTypes.MODIFY_ITEM_BOX_COMPLETED,
});

export const modifyItemBox = (itemBoxId, numItems, warehouseName, onSuccess, onErrors) => dispatch =>
    backend.itemsService.modifyItemBox(itemBoxId, numItems, warehouseName,
        () => {
            dispatch(modifyItemBoxCompleted());
            onSuccess();
        },
        onErrors);

const deleteItemBoxCompleted = () => ({
    type: actionTypes.DELETE_ITEM_BOX_COMPLETED,
});

export const deleteItemBox = (itemBoxId, onSuccess, onErrors) => dispatch =>
    backend.itemsService.deleteItemBox(itemBoxId,
        () => {
            dispatch(deleteItemBoxCompleted());
            onSuccess();
        },
        onErrors);