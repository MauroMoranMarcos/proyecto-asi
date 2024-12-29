const getModuleState = state => state.orders;

export const getOrder = state =>
    getModuleState(state).order;

export const getOrderDrafts = state =>
    getModuleState(state).orderDrafts;