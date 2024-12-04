import {config, appFetch} from './appFetch';

export const createWarehouse = (name, onSuccess, onErrors) =>
    appFetch(`/admin/createWarehouse`,
        config('POST', {name}), onSuccess, onErrors);