import * as types from '../contants/index'
import axios from 'axios'

export const fetchGroups = async (token, classId) => {
    const res = await axios.get(`/group/get_group_class/${classId}`, {
        headers: { Authorization: token }
    });
    return res;
}
export const getGroups = (res) => {
    return {
        type: types.GET_GROUPS,
        payload: res.data
    }
}

export const createGroup = (group) => {
    return {
        type: types.CREATE_GROUP,
        payload: {
            group
        }
    }
}

export const editGroup = (group) => {
    return {
        type: types.EDIT_GROUP,
        payload: {
            group
        }
    }
}

export const deleteGroup = (groupId) => {
    return {
        type: types.DELETE_GROUP,
        payload: {
            groupId
        }
    }
}