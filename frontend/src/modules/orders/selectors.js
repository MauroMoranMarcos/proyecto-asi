const getModuleState = state => state.orders;

export const getOrder = state =>
    getModuleState(state).order;

export const getOrders = state =>
    getModuleState(state).orders;

export const getOrderBoxes = state =>
    getModuleState(state).orderBoxes;