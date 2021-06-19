import * as types from '../contants/index'

const initalState = {
    grades: [],
}

const gradeReducer = (state = initalState, action) => {
    switch (action.type) {
        case types.GET_GRADES: {
            return {
                ...state,
                grades: action.payload.grades
            }
        }
        default: {
            return { ...state }
        }
    }
}

export default gradeReducer;
