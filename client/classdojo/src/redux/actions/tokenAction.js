import * as types from '../contants/index';

export const getToken = (token) => {
    return {
        type: types.GET_TOKEN,
        payload: token,
    }
}