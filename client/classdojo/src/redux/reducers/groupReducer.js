import * as types from '../contants/index';

const initialState = {
    groups: [],
}

const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_GROUPS:
            return {
                ...state,
                groups: action.payload.groups,
            }
        case types.CREATE_GROUP: {
            state.groups.push(action.payload.group)
            return {
                ...state,
            }
        }
        case types.EDIT_GROUP: {
            const newGroupArray = [];
            state.groups.forEach((group => {
                if (group._id === action.payload.group._id) {
                    newGroupArray.push(action.payload.group)
                } else {
                    newGroupArray.push(group);
                }
            }))

            return {
                ...state,
                groups: newGroupArray
            }
        }
        case types.DELETE_GROUP: {
            const newGroupArray = [];
            state.groups.forEach((group => {
                if (group._id !== action.payload.groupId) {
                    newGroupArray.push(group)
                }
            }))
            return {
                ...state,
                groups: newGroupArray
            }
        }
        default:
            return { ...state };
    }
}

export default groupReducer;