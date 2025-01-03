const getModuleState = state => state.items;

export const getItems = state =>
    getModuleState(state).items;

export const getItem = state =>
    getModuleState(state).item;

export const getNumItemBoxes = state =>
    getModuleState(state).numItemBoxes;

export const getItemBoxes = state =>
    getModuleState(state).itemBoxes;

export const getSupplier = state =>
    getModuleState(state).supplier;

export const getSuppliers = state =>
    getModuleState(state).suppliers;

export const getItemsFromSupplier = state =>
    getModuleState(state).itemsFromSupplier;