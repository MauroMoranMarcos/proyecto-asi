import {combineReducers} from 'redux';

import app from '../modules/app';
import staff from '../modules/staff';

const rootReducer = combineReducers({
    app: app.reducer,
    staff: staff.reducer,
});

export default rootReducer;
