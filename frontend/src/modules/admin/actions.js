import * as actionTypes from './actionTypes';
import backend from '../../backend';

const createWarehouseCompleted = warehouseCreated => ({
    type: actionTypes.CREATE_WAREHOUSE_COMPLETED,
    warehouseCreated
});

export const createWarehouse = (name, onSuccess, onErrors) => dispatch =>
    backend.adminService.createWarehouse(name,
        warehouseCreated => {
            dispatch(createWarehouseCompleted(warehouseCreated));
            onSuccess();
        },
        onErrors);