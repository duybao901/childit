import * as types from '../contants/index'
import axios from 'axios'

export const fetchGrades = async () => {
    const res = await axios.get('/grade/all_infor');
    return res;
}

export const getGrades = (res) => {
    return {
        type: types.GET_GRADES,
        payload: res.data
    }
}
