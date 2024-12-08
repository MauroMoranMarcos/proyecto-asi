const getModuleState = state => state.items;

export const getItems = state =>
    getModuleState(state).items;