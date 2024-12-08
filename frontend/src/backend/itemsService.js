import {config, appFetch} from './appFetch';

export const addItemBoxToWarehouse = (formData, onSuccess, onErrors) =>
    appFetch(`/items/addItemBoxToWarehouse`,
        config(`POST`, formData), onSuccess, onErrors);

export const checkInventory = ({page}, onSuccess, onErrors) =>
    appFetch(`/items/checkInventory?page=${page}`,
        config('GET'), onSuccess, onErrors);