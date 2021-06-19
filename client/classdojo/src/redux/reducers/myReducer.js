import { combineReducers } from 'redux'

import auth from './authReducer';
import token from './tokenReducer'
import classes from './classReducer';
import grade from './gradeReducer';
import groups from './groupReducer'

const myReducers = combineReducers({
    auth,
    token,
    classes,
    grade,
    groups
});

export default myReducers;