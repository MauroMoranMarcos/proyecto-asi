import {config, appFetch} from './appFetch';

export const createItem = (formData, onSuccess, onErrors) =>
    appFetch(`/items/createItem`,
        config('POST', formData), onSuccess, onErrors);

export const checkInventory = ({keywords, page}, onSuccess, onErrors) => {

    let path = `/items/checkInventory?page=${page}`;

    if(keywords) {
        path +=`&keywords=${encodeURIComponent(keywords)}`;
    }

    appFetch(path, config('GET'), onSuccess, onErrors);
}

export const addItemBoxToWarehouse = (itemId, numItems, warehouseName, onSuccess, onErrors) =>
    appFetch(`/items/checkInventory/${itemId}/addItemBoxToWarehouse`,
        config(`POST`, {numItems, warehouseName}), onSuccess, onErrors);

export const findItemById = (itemId, onSuccess, onErrors) =>
    appFetch(`/items/checkInventory/${itemId}`,
        config('GET'), onSuccess, onErrors);

export const countNumBoxesOfItemId = (itemId, onSuccess, onErrors) =>
    appFetch(`/items/checkInventory/${itemId}/numBoxes`,
        config('GET'), onSuccess, onErrors);

export const findAllBoxesOfItemId = (itemId, onSuccess, onErrors) =>
    appFetch(`/items/checkInventory/${itemId}/boxes`,
        config('GET'), onSuccess, onErrors);

export const deleteItem = (itemId, onSuccess, onErrors) =>
    appFetch(`/items/checkInventory/${itemId}/deleteItem`,
        config('POST'), onSuccess, onErrors);

export const modifyItem = (itemId, formData, onSuccess, onErrors) =>
    appFetch(`/items/checkInventory/${itemId}/modifyItem`,
        config('PUT', formData), onSuccess, onErrors);

export const modifyItemBox = (itemBoxId, numItems, warehouseName, onSuccess, onErrors) =>
    appFetch(`/items/checkInventory/${itemBoxId}/modifyItemBox`,
        config('PUT', {numItems, warehouseName}), onSuccess, onErrors);

export const addItemsToBox = (itemBoxId, numItemsToAdd, onSuccess, onErrors) =>
    appFetch(`/items/checkInventory/${itemBoxId}/addItemsToBox?numItemsToAdd=${numItemsToAdd}`,
        config('PUT'), onSuccess, onErrors);

export const removeItemsFromBox = (itemBoxId, numItemsToRemove, onSuccess, onErrors) =>
    appFetch(`/items/checkInventory/${itemBoxId}/removeItemsFromBox?numItemsToRemove=${numItemsToRemove}`,
        config('PUT'), onSuccess, onErrors);

export const deleteItemBox = (itemBoxId, onSuccess, onErrors) =>
    appFetch(`/items/checkInventory/${itemBoxId}/deleteItemBox`,
        config('POST'), onSuccess, onErrors);