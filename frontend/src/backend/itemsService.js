import {config, appFetch} from './appFetch';

export const addItemBoxToWarehouse = (formData, onSuccess, onErrors) =>
    appFetch(`/items/addItemBoxToWarehouse`,
        config(`POST`, formData), onSuccess, onErrors);

export const checkInventory = ({page}, onSuccess, onErrors) =>
    appFetch(`/items/checkInventory?page=${page}`,
        config('GET'), onSuccess, onErrors);

export const findItemBoxById = (itemBoxId, onSuccess, onErrors) =>
    appFetch(`/items/checkInventory/${itemBoxId}`,
        config('GET'), onSuccess, onErrors);

export const countNumBoxesOfItemBoxId = (itemBoxId, onSuccess, onErrors) =>
    appFetch(`/items/checkInventory/${itemBoxId}/numBoxes`,
        config('GET'), onSuccess, onErrors);

export const findAllBoxesOfItemBoxId = (itemBoxId, onSuccess, onErrors) =>
    appFetch(`/items/checkInventory/${itemBoxId}/boxes`,
        config('GET'), onSuccess, onErrors);

export const deleteItem = (itemBoxId, onSuccess, onErrors) =>
    appFetch(`/items/checkInventory/${itemBoxId}/deleteItem`,
        config('POST'), onSuccess, onErrors);

export const modifyItem = (itemBoxId, formData, onSuccess, onErrors) =>
    appFetch(`/items/checkInventory/${itemBoxId}/modifyItem`,
        config('PUT', formData), onSuccess, onErrors);

export const modifyItemBox = (itemBoxId, numItems, warehouseName, onSuccess, onErrors) =>
    appFetch(`/items/checkInventory/${itemBoxId}/modifyItemBox`,
        config('PUT', {numItems, warehouseName}), onSuccess, onErrors);

export const deleteItemBox = (itemBoxId, onSuccess, onErrors) =>
    appFetch(`/items/checkInventory/${itemBoxId}/deleteItemBox`,
        config('POST'), onSuccess, onErrors);