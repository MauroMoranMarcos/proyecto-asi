import {combineReducers} from 'redux';

import app from '../modules/app';
import staff from '../modules/staff';
import admin from '../modules/admin';
import items from '../modules/items';
import orders from '../modules/orders';

const rootReducer = combineReducers({
    app: app.reducer,
    staff: staff.reducer,
    admin: admin.reducer,
    items: items.reducer,
    orders: orders.reducer,
});

export default rootReducer;
