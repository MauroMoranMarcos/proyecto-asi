import * as actionTypes from './actionTypes';
import backend from '../../backend';

const addItemBoxToWarehouseCompleted = () => ({
    type: actionTypes.ADD_ITEM_BOX_TO_WAREHOUSE_COMPLETED,
});

export const addItemBoxToWarehouse = (itemName, referenceCode, numItems, barCode, manufacturerRef, supplier, warehouseName, onSuccess, onErrors) => dispatch =>
    backend.itemsService.addItemBoxToWarehouse(itemName, referenceCode, numItems, barCode, manufacturerRef, supplier, warehouseName,
        () => {
            dispatch(addItemBoxToWarehouseCompleted());
            onSuccess();
        },
        onErrors);