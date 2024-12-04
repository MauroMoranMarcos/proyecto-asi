const getModuleState = state => state.admin;

export const getWarehouse = state =>
    getModuleState(state).warehouse;