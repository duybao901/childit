import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import { capitalizeTheFirstLetterOfEachWord } from '../../../../ultis/letter'
import { ShowToastifyPlussSkillAllStudent } from '../../../../ultis/notify'

import * as groupAction from '../../../../redux/actions/groupAction'

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styles from './styles'

const useStyles = makeStyles(styles);

export default function TransitionsModal({ students, classroom, open, handleClose, onEdit, group, onAdd }) {
    const classes = useStyles();
    const disPatch = useDispatch();
    const { token } = useSelector(state => state.token);
    const [studentList, setStudentList] = useState([]);
    const [studentListAdd, setStudentListAdd] = useState({ nameGroup: group ? group.groupName : "", students: [], err: '', loading: false });

    function handleChange(e) {
        setStudentListAdd({
            ...studentListAdd,
            [e.target.name]: e.target.value
        })
    }

    const handleSunmit = async (e) => {
        if (studentListAdd.nameGroup === '') {
            return setStudentListAdd({
                ...studentListAdd,
                [e.target.name]: e.target.value,
                err: "Tên nhóm không được trống",
                loading: false
            })
        }
        if (studentListAdd.students.length === 0) {
            return setStudentListAdd({
                ...studentListAdd,
                [e.target.name]: e.target.value,
                err: "Chưa có học nào sinh đánh dấu",
                loading: false
            })
        }
        try {
            setStudentListAdd({
                ...studentListAdd,
                [e.target.name]: e.target.value,
                err: "",
                loading: true
            })
            if (!onEdit) {
                const res = await axios.post(`/group/create_group/${classroom._id}`, {
                    groupName: studentListAdd.nameGroup,
                    students: studentListAdd.students
                }, {
                    headers: {
                        Authorization: token
                    }
                })
                disPatch(groupAction.createGroup(res.data.group));
                ShowToastifyPlussSkillAllStudent("👨‍🏫 Tạo nhóm thành công")
                handleClose();
            } else {
                const res = await axios.patch(`/group/edit_group/${group._id}`, {
                    groupName: studentListAdd.nameGroup,
                    students: studentListAdd.students
                }, {
                    headers: {
                        Authorization: token
                    }
                })
                disPatch(groupAction.editGroup(res.data.group));
                ShowToastifyPlussSkillAllStudent("👨‍🏫 Chỉnh sửa nhóm thành công")
            }
            setStudentListAdd({
                ...studentListAdd,
                [e.target.name]: e.target.value,
                err: "",
                loading: false
            })
        } catch (err) {
            if (err) {
                console.log(err.response)
                setStudentListAdd({
                    ...studentListAdd,
                    [e.target.name]: e.target.value,
                    err: err.response.data.msg,
                    loading: false
                })
            }
        }
    }

    function addStudent(studentadd) {
        var newStudentArray = studentList.map((student) => {
            if (student._id === studentadd._id) {
                student.check = !student.check;
                return student;
            }
            return student;
        })
        setStudentListAdd(newStudentArray);
        var newA = []
        newStudentArray.forEach((student) => {
            if (student.check === true) {
                newA.push(student._id);
            }
        })
        setStudentListAdd({ ...studentListAdd, students: newA });
    }

    useEffect(() => {
        const newStudentList = [];
        const newStudentListAdd = [];
        if (!onEdit) {
            if (classroom.students.length > 0) {
                classroom.students.forEach(student => {
                    newStudentList.push(student);
                })
            }
        } else {
            classroom.students.forEach(student => {
                if (group.students.includes(student._id)) {
                    student.check = true;
                    newStudentList.push(student);
                    newStudentListAdd.push(student._id);
                } else {
                    student.check = false;
                    newStudentList.push(student);
                }
            })
            setStudentListAdd({ ...studentListAdd, students: newStudentListAdd });
        }
        setStudentList(newStudentList);
    }, [open, classroom.students, onEdit, setStudentListAdd, setStudentList])
    useEffect(() => {
        if (onAdd) {
            var newStudentList = [];
            classroom.students.forEach(student => {
                student.check = false;
                newStudentList.push(student);
            })
            setStudentList(newStudentList);
            setStudentListAdd({
                nameGroup: group ? group.groupName : "",
                students: [],
                err: '',
                loading: false
            })
        }
    }, [onAdd, open, setStudentListAdd, classroom.students, group])


    const deleteGroup = async () => {

        if (window.confirm("👨‍🏫 Bạn có muốn xóa nhóm")) {
            disPatch(groupAction.deleteGroup(group._id));
            handleClose();
            try {
                await axios.delete(`/group/delete_group/${group._id}`, {
                    headers: {
                        Authorization: token
                    }
                })
            } catch (err) {
                if (err) console.log(err.response);
            }
        }
        
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            // keepMounted={true}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <div className={classes.heading}>
                            <h2>{onEdit ? "Chỉnh sửa nhóm" : "Tạo nhóm"}</h2>
                            <i className='bx bx-x' onClick={handleClose}></i>
                        </div>
                        <div className={classes.gr}>
                            {studentListAdd.err && <p className={classes.err}>{studentListAdd.err}</p>}
                            <div >
                                <label htmlFor="nameGroup">Tên nhóm</label>
                                <input style={{ width: '250px' }} type='text' name="nameGroup" id='nameGroup' onChange={handleChange} value={studentListAdd.nameGroup}>
                                </input>
                            </div>
                        </div>
                        <div className={classes.studentsp}>
                            <div className={classes.studentList}>
                                {studentList ? studentList.map(student => {
                                    return <div onClick={() => addStudent(student)} key={student._id} className={classes.studentListItem}>
                                        <img style={{ width: '50px', height: '60px', marginLeft: '10px' }} src={student && student.avatar} alt='itemst'>
                                        </img>
                                        <p>{capitalizeTheFirstLetterOfEachWord(student.name)}</p>
                                        <div className={student.check ? classes.checked : classes.check}>
                                            <i className='bx bx-check'></i>
                                        </div>
                                    </div>
                                }) : ''}
                            </div>
                        </div>
                        <div className={classes.bottom}>
                            {onEdit && <p className={classes.deletegroup} onClick={deleteGroup}>Xóa nhóm</p>}
                            <div></div>
                            <div>
                                <p onClick={handleClose}>Hủy bỏ</p>
                                <button disabled={studentListAdd.loading} onClick={handleSunmit} className={!studentListAdd.loading ? classes.createGroupButton : classes.createGroupButtonLoading}>{onEdit ? "Lưu" : "Tạo nhóm"}</button>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
