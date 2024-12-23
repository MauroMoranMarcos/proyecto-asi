import * as actionTypes from './actionTypes';
import backend from '../../backend';

const createItemCompleted = () => ({
    type: actionTypes.CREATE_ITEM_COMPLETED,
});

export const createItem = (formData, onSuccess, onErrors) => dispatch =>
    backend.itemsService.createItem(formData,
        item => {
            dispatch(createItemCompleted());
            onSuccess(item);
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

const addItemBoxToWarehouseCompleted = () => ({
    type: actionTypes.ADD_ITEM_BOX_TO_WAREHOUSE_COMPLETED,
});

export const addItemBoxToWarehouse = (itemId, numItems, warehouseName, onSuccess, onErrors) => dispatch =>
    backend.itemsService.addItemBoxToWarehouse(itemId, numItems, warehouseName,
        () => {
            dispatch(addItemBoxToWarehouseCompleted());
            onSuccess();
        },
        onErrors);

const findItemByIdCompleted = item => ({
    type: actionTypes.FIND_ITEM_BY_ID_COMPLETED,
    item
});

export const findItemById = (itemId) => dispatch => {
    backend.itemsService.findItemById(itemId,
        item => {
            dispatch(findItemByIdCompleted(item));
        });
}

export const clearItem = () => ({
    type: actionTypes.CLEAR_ITEM
});

const countNumBoxesOfItemIdCompleted = numItemBoxes => ({
    type: actionTypes.COUNT_NUM_BOXES_OF_ITEM_ID_COMPLETED,
    numItemBoxes
});

export const countNumBoxesOfItemId = (itemId, onSuccess, onErrors) => dispatch => {
    backend.itemsService.countNumBoxesOfItemId(itemId,
        numItemBoxes => {
            dispatch(countNumBoxesOfItemIdCompleted(numItemBoxes));
        },
        onErrors);
}

export const clearNumItemBoxes = () => ({
    type: actionTypes.CLEAR_NUM_ITEM_BOXES
});

const findAllBoxesOfItemIdCompleted = itemBoxes => ({
    type: actionTypes.FIND_ALL_BOXES_OF_ITEM_ID_COMPLETED,
    itemBoxes
});

export const findAllBoxesOfItemId = (itemId, onSuccess, onErrors) => dispatch => {
    backend.itemsService.findAllBoxesOfItemId(itemId,
        itemBoxes => {
            dispatch(findAllBoxesOfItemIdCompleted(itemBoxes));
        },
        onErrors);
}

export const clearItemBoxes = () => ({
    type: actionTypes.CLEAR_ITEM_BOXES
});

const deleteItemCompleted = () => ({
    type: actionTypes.DELETE_ITEM_COMPLETED,
});

export const deleteItem = (itemId, onSuccess, onErrors) => dispatch =>
    backend.itemsService.deleteItem(itemId,
        () => {
            dispatch(deleteItemCompleted());
            onSuccess();
        },
        onErrors);

const modifyItemCompleted = () => ({
    type: actionTypes.MODIFY_ITEM_COMPLETED,
});

export const modifyItem = (itemId, formData, onSuccess, onErrors) => dispatch =>
    backend.itemsService.modifyItem(itemId, formData,
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

const addItemsToBoxCompleted = () => ({
    type: actionTypes.ADD_ITEMS_TO_BOX_COMPLETED,
});

export const addItemsToBox = (itemBoxId, numItemsToAdd, onSuccess, onErrors) => dispatch =>
    backend.itemsService.addItemsToBox(itemBoxId, numItemsToAdd,
        () => {
            dispatch(addItemsToBoxCompleted());
            onSuccess();
        },
        onErrors);

const removeItemsFromBoxCompleted = () => ({
    type: actionTypes.REMOVE_ITEMS_FROM_BOX_COMPLETED,
});

export const removeItemsFromBox = (itemBoxId, numItemsToRemove, onSuccess, onErrors) => dispatch =>
    backend.itemsService.removeItemsFromBox(itemBoxId, numItemsToRemove,
        () => {
            dispatch(removeItemsFromBoxCompleted());
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