import * as types from '../contants/index';

const initialState = {
    classes: [],
    isPlus: false,
    classArraySkillNotify: [],
}

const classReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.GET_CLASSES: {
            return {
                ...state,
                classes: action.payload
            }
        }
        case types.CREATE_NEW_CLASS: {
            state.classes.push(action.payload);
            return {
                ...state,
            }
        }
        case types.EDIT_CLASS: {
            const { className, gradeId, classId } = action.payload;
            state.classes.map((classroom) => {
                if (classroom._id === classId) {
                    classroom.name = className;
                    classroom.gradeId = gradeId;
                }
                return classroom;
            })
            return {
                ...state,
            }
        }
        case types.EDIT_CLASS_AVATAR: {
            const { avatar, id } = action.payload;
            state.classes.map((classroom) => {
                if (classroom._id === id) {
                    classroom.avatar = avatar;
                }
                return classroom;
            })
            return {
                ...state,
            }
        }
        case types.ADD_STUDENTS: {
            const { studentsAdd, classId } = action.payload
            state.classes.map((classroom) => {
                if (classroom._id === classId) {
                    classroom.students = classroom.students.concat(studentsAdd)
                }
                return classroom;
            })
            return {
                ...state,
            }
        }
        case types.CHANGE_AVATAR_STUDENT: {
            const { url, studentId, classId } = action.payload;
            state.classes.forEach((classroom) => {
                if (classroom._id === classId) {
                    classroom.students.map((student) => {
                        if (student._id === studentId) {
                            student.avatar = url;
                        }
                        return student;
                    })
                }
            })
            return {
                ...state
            }
        }
        case types.EDIT_STUDENT_INFOR: {
            const { name, studentId, classId } = action.payload;
            state.classes.forEach((classroom) => {
                if (classroom._id === classId) {
                    classroom.students.map((student) => {
                        if (student._id === studentId) {
                            student.name = name;
                        }
                        return student;
                    })
                }
            })
            return {
                ...state
            }
        }
        case types.REMOVE_STUDENT: {
            const { idStudent, classId } = action.payload;
            const newArrayStudent = [];
            var skillCur = 0;
            state.classes.map((classroom) => {
                if (classroom._id === classId) {
                    classroom.students.forEach((student) => {
                        if (student._id !== idStudent) {
                            newArrayStudent.push(student);
                        }
                        skillCur = student.skillNumber;

                    })
                    classroom.allPoints = classroom.allPoints - skillCur;
                    classroom.students = newArrayStudent;
                }
                return classroom;
            })
            return {
                ...state,

            }
        }
        case types.EDIT_SKILL_CLASS: {
            const { idSkill, idClass, name, number, avatar } = action.payload;
            const newSkillsArray = [];
            state.classes.map((classroom) => {
                if (classroom._id === idClass) {
                    classroom.skills.forEach((skill) => {
                        if (skill._id === idSkill) {
                            skill.name = name;
                            skill.number = parseInt(number);
                            skill.avatar = { url: avatar };
                            newSkillsArray.push(skill);
                        } else {
                            newSkillsArray.push(skill);
                        }
                    })
                    classroom.skills = newSkillsArray;
                }
                return classroom;
            })
            return {
                ...state
            }
        }
        case types.ADD_SKILL_CLASS: {
            const { idClass, skill } = action.payload;
            state.classes.map((classroom) => {
                if (classroom._id === idClass) {
                    classroom.skills.push(skill);
                }
                return classroom;
            })
            return {
                ...state
            }
        }
        case types.DELETE_SKILL_CLASS: {
            const { idClass, idSkill } = action.payload;

            const newSkillsArray = [];

            state.classes.map((classroom) => {
                if (classroom._id === idClass) {
                    classroom.skills.forEach((skill) => {
                        if (skill._id !== idSkill) {
                            newSkillsArray.push(skill);
                        }
                    })
                    classroom.skills = newSkillsArray;
                }
                return classroom;
            })
            return {
                ...state
            }
        }
        case types.PLUS_SKILL_STUDENT: {
            const { idClass, idStudent, skill } = action.payload;
            state.classes.forEach((classroom) => {
                if (classroom._id === idClass) {
                    classroom.allPoints = parseInt(classroom.allPoints) + parseInt(skill.number);
                    classroom.students.map((student) => {
                        if (student._id === idStudent) {
                            student.skillNumber = parseInt(student.skillNumber) + parseInt(skill.number);
                            student.skillArray.push({ ...skill, date: new Date().toISOString() });
                        }
                        return student;
                    })
                }
            })
            return {
                ...state
            }
        }
        case types.PLUS_SKILL_ALL_STUDENT: {
            const { idClass, skill } = action.payload;
            state.classes.forEach((classroom) => {
                if (classroom._id === idClass) {
                    classroom.allPoints = parseInt(classroom.allPoints) + parseInt(skill.number) * classroom.students.length;
                    classroom.students.map((student) => {
                        student.skillNumber = parseInt(student.skillNumber) + parseInt(skill.number);
                        student.skillArray.push({ ...skill, date: new Date().toISOString() });
                        return student;
                    })
                }
            })
            return {
                ...state
            }
        }
        case types.IS_PLUS: {
            return {
                ...state,
                isPlus: true
            }
        }
        case types.NO_PLUS: {
            return {
                ...state,
                isPlus: false
            }
        }
        case types.PLUS_SKILL_ALL_GROUP: {
            const { idClass, skill, students } = action.payload;
            state.classes.forEach((classroom) => {
                if (classroom._id === idClass) {
                    classroom.allPoints = parseInt(classroom.allPoints) + parseInt(skill.number) * students.length;
                    students.forEach(student_g => {
                        classroom.students.map((student) => {
                            if (student_g._id === student._id) {
                                student.skillNumber = parseInt(student.skillNumber) + parseInt(skill.number);
                                student.skillArray.push({ ...skill, date: new Date().toISOString() });
                                return student;
                            }
                            return student;
                        })
                    })
                }
            })
            return {
                ...state
            }
        }
        case types.INVITE_PARENT: {
            const { parent, idClass } = action.payload;
            state.classes.forEach((classroom) => {
                if (classroom._id === idClass) {
                    classroom.students.map((student) => {
                        if (parent.idStudents === student._id) {
                            student.parents.push(parent);
                            return student;
                        }
                        return student;
                    })
                }
            })
            return {
                ...state
            }
        }
        case types.ADD_CHILD: {
            const { email, idStudent, idClass } = action.payload;
            state.classes.forEach((classroom) => {
                if (classroom._id === idClass) {
                    classroom.students.forEach((student) => {
                        if (idStudent === student._id) {
                            student.parents.map((parent) => {
                                if (parent.idStudent === idStudent) {
                                    parent.email = email;
                                    parent.status = 2;
                                    console.log(parent);
                                    return parent;
                                }
                                return parent;
                            })
                        }
                    })
                }
            })
            return {
                ...state
            }
        }
        default:
            return { ...state };
    }
}
export default classReducer;