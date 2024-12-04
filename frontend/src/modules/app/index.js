import * as actions from './actions';
import reducer from './reducer'
import * as selectors from './selectors';

export {default as App} from "./components/App";
export {default as Home} from "./components/Home";

// eslint-disable-next-line
export default {actions, reducer, selectors};
