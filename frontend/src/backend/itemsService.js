import {config, appFetch} from './appFetch';

export const addItemBoxToWarehouse = (formData, onSuccess, onErrors) =>
    appFetch(`/items/addItemBoxToWarehouse`,
        config(`POST`, formData), onSuccess, onErrors);