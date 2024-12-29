import backend from '../../backend';
import * as actionTypes from "./actionTypes";

const createOrderCompleted = () => ({
    type: actionTypes.CREATE_ORDER_COMPLETED,
});

export const createItem = (formData, onSuccess, onErrors) => dispatch =>
    backend.orderService.createOrder(
        order => {
            dispatch(createOrderCompleted());
            onSuccess(order);
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