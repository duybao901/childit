import React, { useState } from 'react';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styles from './styles'

import * as classAction from '../../../../redux/actions/classAction'
import { ShowToastifySuccess } from '../../../../ultis/notify'
import {capitalizeTheFirstLetterOfEachWord} from '../../../../ultis/letter'

const useStyles = makeStyles(styles);

export default function AddStudentModal({ open, handleClose, classroom }) {
    const className = useStyles();
    const disPatch = useDispatch();
    const [studentAdd, setStudentAdd] = useState({ arrStudents: [], studentName: '', err: '' });
    const { arrStudents, studentName, err } = studentAdd;
    const { students } = classroom;
    const { token } = useSelector(state => state.token)
    const [loadingAdd, setLoadingAdd] = useState(false)

    function onHandleChange(e) {
        setStudentAdd({
            ...studentAdd,
            [e.target.name]: e.target.value,
            err: '',
        })
    }
    const submitStudent = async (e) => {
        e.preventDefault();
        if (studentName.trim().split(' ').length <= 1) {
            return setStudentAdd({
                ...studentAdd,
                [e.target.name]: e.target.value,
                err: "Tên học sinh bao gồm phải có họ và tên ",
            })
        }
        var found = false;
        for (let i = 0; i < arrStudents.length; i++) {
            if (arrStudents[i].name.toLowerCase().replaceAll(' ', '') === studentName.toLowerCase().replaceAll(' ', '')) {
                found = true;
                break;
            }
        }
        for (let i = 0; i < students.length; i++) {
            if (students[i].name.toLowerCase().replaceAll(' ', '') === studentName.toLowerCase().replaceAll(' ', '')) {
                found = true;
                break;
            }
        }
        if (found) {
            return setStudentAdd({
                ...studentAdd,
                [e.target.name]: e.target.value,
                err: "Có vẻ như bạn đang cố thêm một học sinh vào một lớp hai lần",
            })
        } else {
            arrStudents.push({ name: studentName });
            return setStudentAdd({
                ...studentAdd,
                arrStudents,
                studentName: '',
                err: ''
            })
        }
    }
    function removeStudent(e) {
        var name = e.target.attributes.dataname.value;
        var newArrStudents = [];
        for (let i = 0; i < arrStudents.length; i++) {
            if (arrStudents[i].name.toLowerCase() !== name.toLowerCase()) {
                newArrStudents.push(arrStudents[i]);
            }
        }
        return setStudentAdd({
            ...studentAdd,
            arrStudents: newArrStudents,
        })
    }
    const addStudents = async () => {
        try {
            setLoadingAdd(true);
            const res = await axios.post(`/class/add_students/${classroom._id}`, {
                students: arrStudents
            }, {
                headers: { Authorization: token }
            })
            setLoadingAdd(false);
            disPatch(classAction.addStudents(res.data.studentArray, classroom._id));
            setStudentAdd({
                ...setStudentAdd,
                studentName: '',
                arrStudents: [],
                err: '',
            })
            handleClose();
            ShowToastifySuccess('👨‍🏫 Thêm học sinh thành công');
        } catch (err) {
            if (err) console.log(err);
        }
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={className.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={className.paper}>
                        <div className={className.heading}>
                            <h2>Thêm học sinh</h2>
                            <i className='bx bx-x' onClick={handleClose}></i>
                        </div>
                        <div className={className.addStudent}>
                            {!err ? <p>Thêm học sinh theo họ tên</p> : <p className={className.errorText}>{err}</p>}
                            <form onSubmit={submitStudent}>
                                <input placeholder="Họ và tên học sinh" value={studentName} onChange={onHandleChange} type='text' name='studentName' className={className.input}>
                                </input>
                                {
                                    studentName.length > 0 && <div onClick={submitStudent} className={className.addWrap}>
                                        <i className='bx bxs-plus-circle'></i>
                                        <span>Add "{studentName}"</span>
                                    </div>
                                }
                            </form>
                        </div>
                        <ul className={className.studentList}>
                            {arrStudents.length > 0 &&
                                arrStudents.map((student, index) => {
                                    return (
                                        <li key={index}>
                                            <div className={className.studentInfor}>
                                                <div className={className.wrapImg}>
                                                    <img src="https://res.cloudinary.com/dxnfxl89q/image/upload/v1622909280/Classdojo/student_avatar_1_em4dxj.png" alt='addstudentavatar'>
                                                    </img>
                                                </div>
                                                <span>
                                                    {student && capitalizeTheFirstLetterOfEachWord(student.name)}
                                                </span>
                                            </div>
                                            <i onClick={removeStudent} className='bx bx-x' dataname={student.name}></i>
                                        </li>)
                                })
                            }
                        </ul>
                        <div className={className.bottom}>
                            <span>
                                {/* Hoặc sao chép và dán danh sách học sinh của bạn */}
                            </span>
                            <button className={arrStudents.length === 0 || loadingAdd ? className.buttonDisable : ''} onClick={addStudents} disabled={arrStudents.length === 0 || loadingAdd ? true : false}>Lưu</button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}