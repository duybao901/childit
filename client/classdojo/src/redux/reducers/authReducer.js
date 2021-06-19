import * as types from '../contants/index';

const initialState = {
    user: {},
    isLoggid: false,
    isTeacher: false,
    isParent: false,
    childs: []
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN:
            return {
                ...state,
                isLoggid: true,
            }
        case types.LOGOUT:
            return {
                ...state,
                isLoggid: false,
                isTeacher: false,
                isParent: false,
            }

        case types.GET_USER:
            return {
                ...state,
                ...action.payload,
            }
        case types.GET_CHILD: {
            return {
                ...state,
                childs: action.payload.students
            }
        }
        default:
            return state;
    }
}
export default authReducer;