import {combineReducers} from 'redux';

import app from '../modules/app';
import staff from '../modules/staff';
import admin from '../modules/admin';

const rootReducer = combineReducers({
    app: app.reducer,
    staff: staff.reducer,
    admin: admin.reducer,
});

export default rootReducer;
