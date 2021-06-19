import * as types from '../contants/index';
import axios from 'axios'

export const fetchClasses = async (token) => {
    const res = await axios.get("/user/get_classes", {
        headers: { Authorization: token }
    });
    return res;
}

export const getClasses = (res) => {
    return {
        type: types.GET_CLASSES,
        payload: res.data.classes
    }
}

export const createNewClass = (classroom) => {
    return {
        type: types.CREATE_NEW_CLASS,
        payload: classroom
    }
}

export const editClass = (classInfor) => {
    return {
        type: types.EDIT_CLASS,
        payload: classInfor,
    }
}

export const editClassAvatar = (avatar, id) => {
    return {
        type: types.EDIT_CLASS_AVATAR,
        payload: {
            avatar,
            id
        }
    }
}

export const addStudents = (studentsAdd, classId) => {
    return {
        type: types.ADD_STUDENTS,
        payload: {
            studentsAdd,
            classId
        }
    }
}

export const changeAvatarStudent = (url, studentId, classId) => {
    return {
        type: types.CHANGE_AVATAR_STUDENT,
        payload: { url, studentId, classId }
    }
}

export const editStudentInfor = (name, studentId, classId) => {
    return {
        type: types.EDIT_STUDENT_INFOR,
        payload: { name, studentId, classId }
    }
}

export const removeStudent = (idStudent, classId) => {
    return {
        type: types.REMOVE_STUDENT,
        payload: {
            idStudent,
            classId
        }
    }
}

export const editSkillClass = (idSkill, idClass, name, number, avatar) => {
    return {
        type: types.EDIT_SKILL_CLASS,
        payload: {
            idSkill, idClass, name, number, avatar
        }
    }
}

export const addSkillClass = (idClass, skill) => {
    return {
        type: types.ADD_SKILL_CLASS,
        payload: {
            idClass, skill
        }
    }
}

export const deleteSkillClass = (idClass, idSkill) => {
    return {
        type: types.DELETE_SKILL_CLASS,
        payload: {
            idClass, idSkill
        }
    }
}

export const plusSkillStudent = (idClass, idStudent, skill) => {
    return {
        type: types.PLUS_SKILL_STUDENT,
        payload: {
            idClass, idStudent, skill
        }
    }
}

export const plusSkillAllStudent = (idClass, skill) => {
    return {
        type: types.PLUS_SKILL_ALL_STUDENT,
        payload: {
            idClass, skill
        }
    }
}

export const plusSkillAllGroup = (idClass, skill, students) => {
    return {
        type: types.PLUS_SKILL_ALL_GROUP,
        payload: {
            idClass, skill, students
        }
    }
}

export const inviteParent = (parent, idClass) => {
    return {
        type: types.INVITE_PARENT,
        payload: {
            parent,
            idClass
        }
    }
}

export const addChild = (email, idStudent, idClass) => {
    return {
        type: types.ADD_CHILD,
        payload: {
            email, idStudent, idClass
        }
    }
}