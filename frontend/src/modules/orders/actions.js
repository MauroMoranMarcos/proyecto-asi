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