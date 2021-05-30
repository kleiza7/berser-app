  
import { combineReducers } from 'redux';

import projects from './projects';
import auth from './auth';

export default combineReducers({
    projects,
    auth
});