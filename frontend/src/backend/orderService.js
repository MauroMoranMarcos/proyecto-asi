import {config, appFetch} from './appFetch';

export const findOrderDrafts = ({page}, onSuccess, onErrors) =>
    appFetch(`/orders/findOrderDrafts&page=${page}`,
        config('GET'), onSuccess, onErrors);

export const findOrderById = (orderId, onSuccess, onErrors) =>
    appFetch(` /orders/${orderId}`,
        config('GET'), onSuccess, onErrors);