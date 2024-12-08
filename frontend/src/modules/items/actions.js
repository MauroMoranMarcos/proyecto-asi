import * as actionTypes from './actionTypes';
import backend from '../../backend';

const addItemBoxToWarehouseCompleted = () => ({
    type: actionTypes.ADD_ITEM_BOX_TO_WAREHOUSE_COMPLETED,
});

export const addItemBoxToWarehouse = (formData, onSuccess, onErrors) => dispatch =>
    backend.itemsService.addItemBoxToWarehouse(formData,
        () => {
            dispatch(addItemBoxToWarehouseCompleted());
            onSuccess();
        },
        onErrors);