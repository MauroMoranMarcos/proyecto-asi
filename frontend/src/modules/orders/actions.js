import * as actionTypes from './actionTypes';
import backend from '../../backend';

const findOrderByIdCompleted = order => ({
    type: actionTypes.FIND_ORDER_BY_ID_COMPLETED,
    order
});

export const findOrderById = (orderId) => dispatch => {
    backend.orderService.findOrderById(orderId,
        order => {
            dispatch(findOrderByIdCompleted(order));
        });
}

export const clearOrder = () => ({
    type: actionTypes.CLEAR_ORDER
});

const findOrderDraftsCompleted = orderDrafts => ({
    type: actionTypes.FIND_ORDER_DRAFTS_COMPLETED,
    orderDrafts
});

const clearOrderDrafts = () => ({
    type: actionTypes.CLEAR_ORDER_DRAFTS
});

export const findOrderDrafts = (criteria) => dispatch => {

    dispatch(clearOrderDrafts());
    backend.orderService.findOrderDrafts(criteria,
        result => dispatch(findOrderDraftsCompleted({criteria, result})));

}

export const previousFindOrderDraftsResultPage = (criteria) =>
    findOrderDrafts({...criteria, page: criteria.page - 1});

export const nextFindOrderDraftsResultPage = (criteria) =>
    findOrderDrafts({...criteria, page: criteria.page + 1});

const createOrderCompleted = order => ({
    type: actionTypes.CREATE_ORDER_COMPLETED,
    order
});

export const createOrder = (onSuccess, onErrors) => dispatch =>
    backend.orderService.createOrder(
        order => {
            dispatch(createOrderCompleted(order));
            onSuccess(order);
        },
        onErrors);

const findBoxesInOrderCompleted = orderBoxes => ({
    type: actionTypes.FIND_BOXES_FROM_ORDER_COMPLETED,
    orderBoxes
});

export const findBoxesInOrder = (orderId, onSuccess, onErrors) => dispatch =>
    backend.orderService.findBoxesInOrder(orderId,
        orderBoxes => {
            dispatch(findBoxesInOrderCompleted(orderBoxes));
            onSuccess();
        },
        onErrors);

const addBoxToOrderCompleted = orderBoxes => ({
    type: actionTypes.ADD_BOX_TO_ORDER_COMPLETED,
    orderBoxes
});

export const addBoxToOrder = (orderId, itemId, numBoxes, numItemsInBox, onSuccess, onErrors) => dispatch =>
    backend.orderService.addBoxToOrder(orderId, itemId, numBoxes, numItemsInBox,
        orderBoxes => {
            dispatch(addBoxToOrderCompleted(orderBoxes));
            onSuccess();
        },
        onErrors);

const updateNumBoxesInOrderCompleted = orderBoxes => ({
    type: actionTypes.UPDATE_NUMBER_OF_BOXES_IN_ORDER_COMPLETED,
    orderBoxes
});

export const updateNumBoxesInOrder = (orderId, boxId, newNumberOfBoxes, onSuccess, onErrors) => dispatch =>
    backend.orderService.updateNumBoxesInOrder(orderId, boxId, newNumberOfBoxes,
        orderBoxes => {
            dispatch(updateNumBoxesInOrderCompleted(orderBoxes));
            onSuccess();
        },
        onErrors);

const deleteBoxFromOrderCompleted = orderBoxes => ({
    type: actionTypes.DELETE_BOX_FROM_ORDER_COMPLETED,
    orderBoxes
});

export const deleteBoxInOrder = (orderId, boxId, onSuccess, onErrors) => dispatch =>
    backend.orderService.deleteBoxInOrder(orderId, boxId,
        orderBoxes => {
            dispatch(deleteBoxFromOrderCompleted(orderBoxes));
            onSuccess();
        },
        onErrors);

const deleteOrderByIdCompleted = () => ({
    type: actionTypes.DELETE_ORDER_BY_ID_COMPLETED
});

export const deleteOrderById = (orderId, onSuccess, onErrors) => dispatch =>
    backend.orderService.deleteOrderById(orderId,
        () => {
            dispatch(deleteOrderByIdCompleted());
            onSuccess();
        },
        onErrors);

const sendOrderToAdminsCompleted = () => ({
    type: actionTypes.SEND_ORDER_TO_ADMINS_COMPLETED
});

export const sendOrderToAdmins = (orderId, onSuccess, onErrors) => dispatch =>
    backend.orderService.sendOrderToAdmins(orderId,
        () => {
            dispatch(sendOrderToAdminsCompleted());
            onSuccess();
        },
        onErrors);

const findOrdersSentToAdminsCompleted = ordersSentToAdmins => ({
    type: actionTypes.FIND_ORDERS_SENT_TO_ADMINS,
    ordersSentToAdmins
});

const clearOrdersSentToAdmins = () => ({
    type: actionTypes.CLEAR_ORDERS_SENT_TO_ADMINS
});

export const findOrdersSentToAdmins = (criteria) => dispatch => {

    dispatch(clearOrdersSentToAdmins());
    backend.orderService.findOrdersSentToAdmins(criteria,
        result => dispatch(findOrdersSentToAdminsCompleted({criteria, result})));

}

export const previousFindOrdersSentToAdminsResultPage = (criteria) =>
    findOrdersSentToAdmins({...criteria, page: criteria.page - 1});

export const nextFindOrdersSentToAdminsResultPage = (criteria) =>
    findOrdersSentToAdmins({...criteria, page: criteria.page + 1});