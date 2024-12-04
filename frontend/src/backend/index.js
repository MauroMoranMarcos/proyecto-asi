import {init} from './appFetch';
import * as staffService from './staffService';
import * as adminService from './adminService';
import * as itemsService from './itemsService';

export {default as NetworkError} from "./NetworkError";

// eslint-disable-next-line
export default {init, staffService, adminService, itemsService};
