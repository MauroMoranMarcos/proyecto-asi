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

const findAllWarehousesCompleted = warehouses => ({
    type: actionTypes.FIND_ALL_WAREHOUSES_COMPLETED,
    warehouses
});

export const findAllWarehouses = () => dispatch => {
    backend.adminService.findAllWarehouses(
        warehouses => {
            dispatch(findAllWarehousesCompleted(warehouses))
        })
}