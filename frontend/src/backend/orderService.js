import {config, appFetch} from './appFetch';

export const findOrderDrafts = ({page}, onSuccess, onErrors) =>
    appFetch(`/orders/findOrderDrafts&page=${page}`,
        config('GET'), onSuccess, onErrors);

export const findOrderById = (orderId, onSuccess, onErrors) =>
    appFetch(` /orders/${orderId}`,
        config('GET'), onSuccess, onErrors);

export const createOrder = (onSuccess, onErrors) =>
    appFetch(`/orders/createOrder`,
        config('POST'), onSuccess, onErrors);

export const addBoxToOrder = (orderId, itemId, numBoxes, numItemsInBox, onSuccess, onErrors) =>
    appFetch(`/orders/${orderId}/addBox?itemId=${itemId}&numBoxes=${numBoxes}&numItemsInBox=${numItemsInBox}`,
        config(`POST`), onSuccess, onErrors);

export const updateNumBoxesInOrder = (orderId, boxId, newNumberOfBoxes, onSuccess, onErrors) =>
    appFetch(`/orders/${orderId}/box/${boxId}?newNumberOfBoxes=${newNumberOfBoxes}`,
        config(`PUT`), onSuccess, onErrors);

export const deleteBoxInOrder = (orderId, boxId, onSuccess, onErrors) =>
    appFetch(`/orders/${orderId}/box/${boxId}/delete`,
        config(`POST`), onSuccess, onErrors);
