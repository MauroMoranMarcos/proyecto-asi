import {config, appFetch} from './appFetch';

export const findOrderDrafts = ({page}, onSuccess, onErrors) =>
    appFetch(`/orders/findOrderDrafts?page=${page}`,
        config('GET'), onSuccess, onErrors);

export const findOrderById = (orderId, onSuccess, onErrors) =>
    appFetch(`/orders/${orderId}`,
        config('GET'), onSuccess, onErrors);

export const createOrder = (onSuccess, onErrors) =>
    appFetch(`/orders/createOrder`,
        config('POST'), onSuccess, onErrors);

export const addBoxToOrder = (orderId, itemId, numBoxes, numItemsInBox, onSuccess, onErrors) =>
    appFetch(`/orders/${orderId}/addBox?itemId=${itemId}&numBoxes=${numBoxes}&numItemsInBox=${numItemsInBox}`,
        config(`POST`), onSuccess, onErrors);

export const findBoxesInOrder = (orderId, onSuccess, onErrors) =>
    appFetch(`/orders/${orderId}/boxes`,
        config(`GET`), onSuccess, onErrors);

export const updateNumBoxesInOrder = (orderId, boxId, newNumberOfBoxes, onSuccess, onErrors) =>
    appFetch(`/orders/${orderId}/boxes/${boxId}/updateNumBoxes?newNumberOfBoxes=${newNumberOfBoxes}`,
        config(`PUT`), onSuccess, onErrors);

export const deleteBoxInOrder = (orderId, boxId, onSuccess, onErrors) =>
    appFetch(`/orders/${orderId}/boxes/${boxId}/delete`,
        config(`POST`), onSuccess, onErrors);

export const deleteOrderById = (orderId, onSuccess, onErrors) =>
    appFetch(`/orders/${orderId}/deleteOrder`,
        config('POST'), onSuccess, onErrors);

export const sendOrderToAdmins = (orderId, onSuccess, onErrors) =>
    appFetch(`/orders/${orderId}/sendOrderToAdmins`,
        config('PUT'), onSuccess, onErrors);

export const findOrdersSentToAdmins = ({page}, onSuccess, onErrors) =>
    appFetch(`/orders/findOrdersSentToAdmins?page=${page}`,
        config('GET'), onSuccess, onErrors);

export const updateWarehouseStock = (orderId, warehouseName, onSuccess, onErrors) =>
    appFetch(`/orders/${orderId}/updateWarehouseStock`,
        config('POST', {warehouseName}), onSuccess, onErrors);
