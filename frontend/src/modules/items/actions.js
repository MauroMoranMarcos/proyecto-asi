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

export const findItemById = (itemId, onSuccess, onErrors) => dispatch => {
    backend.itemsService.findItemById(itemId,
        item => {
            dispatch(findItemByIdCompleted(item));
            if (typeof onSuccess === 'function') {
                onSuccess(item);
            }
        }, onErrors);
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

const createSupplierCompleted = (supplierCreated) => ({
    type: actionTypes.CREATE_SUPPLIER_COMPLETED,
    supplierCreated
});

export const createSupplier = (supplierName, onSuccess, onErrors) => dispatch =>
    backend.itemsService.createSupplier(supplierName,
        supplierCreated => {
            dispatch(createSupplierCompleted(supplierCreated));
            onSuccess(supplierCreated);
        },
        onErrors);

const findAllSuppliersCompleted = suppliers => ({
    type: actionTypes.FIND_ALL_SUPPLIERS_COMPLETED,
    suppliers
});

const clearFindAllSuppliers = () => ({
    type: actionTypes.CLEAR_FIND_ALL_SUPPLIERS
});

export const findAllSuppliers = () => dispatch => {

    dispatch(clearFindAllSuppliers());
    backend.itemsService.findAllSuppliers(result => dispatch(findAllSuppliersCompleted(result)));

}

export const clearFindItemsFromSupplier = () => ({
    type: actionTypes.CLEAR_FIND_ITEMS_FROM_SUPPLIER
});

const findItemsFromSupplierCompleted = (itemsFromSupplier) => ({
    type: actionTypes.FIND_ITEMS_FROM_SUPPLIER_COMPLETED,
    itemsFromSupplier
});

export const findItemsFromSupplier = (criteria, onSuccess, onErrors) => dispatch => {

    backend.itemsService.findItemsFromSupplier(criteria,
        result => {
            dispatch(findItemsFromSupplierCompleted({criteria, result}));
            if (typeof onSuccess === 'function') {
                onSuccess(result);
            }
        }, onErrors);

}

export const previousFindItemsFromSupplierResultPage = (criteria) =>
    findItemsFromSupplier({...criteria, page: criteria.page - 1});

export const nextFindItemsFromSupplierResultPage = (criteria) =>
    findItemsFromSupplier({...criteria, page: criteria.page + 1});

const findSupplierByIdCompleted = (supplier) => ({
    type: actionTypes.FIND_SUPPLIER_BY_ID_COMPLETED,
    supplier
});

export const findSupplierById = (supplierId, onSuccess, onErrors) => dispatch =>
    backend.itemsService.findSupplierById(supplierId,
        supplier => {
            dispatch(findSupplierByIdCompleted(supplier));
            if (typeof onSuccess === 'function') {
                onSuccess(supplier);
            }
        },
        onErrors);

export const clearSupplier = () => ({
    type: actionTypes.CLEAR_SUPPLIER
});

const findAllItemsCompleted = (items) => ({
    type: actionTypes.FIND_ALL_ITEMS_COMPLETED,
    items
});

export const findAllItems = (onSuccess, onErrors) => dispatch =>
    backend.itemsService.findAllItems(
        items => {
            dispatch(findAllItemsCompleted(items));
            onSuccess();
        },
        onErrors);