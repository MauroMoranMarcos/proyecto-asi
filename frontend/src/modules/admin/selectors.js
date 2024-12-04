const getModuleState = state => state.admin;

export const getWarehouse = state =>
    getModuleState(state).warehouse;

export const getAllWarehouses = state =>
    getModuleState(state).warehouses;