import * as types from '../contants/index'
import axios from 'axios';

export const login = () => {
    return {
        type: types.LOGIN,
    }
}

export const logout = () => {
    return {
        type: types.LOGOUT
    }
}

export const fetchUser = async (token) => {
    const res = await axios.get('/user/infor', {
        headers: { Authorization: token }
    })
    return res;
}

export const getUserInfor = (res) => {
    return {
        type: types.GET_USER,
        payload: {
            user: res.data,
            isTeacher: res.data.role === 1 ? true : false,
            isParent: res.data.role === 2 ? true : false,
        }
    }
}
export const fectChilds = async (token) => {
    const res = await axios.get("/user/get_childs", {
        headers: {
            Authorization: token
        }
    })
    return res;
}

export const getChilds = (res) => {
    return {
        type: types.GET_CHILD,
        payload: {
            students: res.data.students
        }
    }
}
