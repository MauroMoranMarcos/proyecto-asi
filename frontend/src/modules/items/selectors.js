const getModuleState = state => state.items;

export const getItems = state =>
    getModuleState(state).items;

export const getItem = state =>
    getModuleState(state).item;