import {config, appFetch} from './appFetch';

export const addItemBoxToWarehouse = (itemName, referenceCode, numItems, barCode, manufacturerRef, supplier, warehouseName, onSuccess, onErrors) =>
    appFetch(`/items/addItemBoxToWarehouse`,
        config(`POST`, {itemName, referenceCode, numItems, barCode, manufacturerRef, supplier, warehouseName}), onSuccess, onErrors);