const getModuleState = state => state.items;

export const getItems = state =>
    getModuleState(state).items;

export const getItem = state =>
    getModuleState(state).item;

export const getNumItemBoxes = state =>
    getModuleState(state).numItemBoxes;

export const getItemBoxes = state =>
    getModuleState(state).itemBoxes;