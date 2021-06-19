import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios';


import * as classAction from '../../../../redux/actions/classAction'
import { capitalizeTheFirstLetterOfEachWord } from '../../../../ultis/letter'
import { ShowToastifySuccess } from '../../../../ultis/notify'

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styles from './styles'

import SelectAvatarBox from "../selectavatarbox/SelectAvatarBox"
import InviteParentModal from '../inviteparentmodal/InviteParentModal';

const useStyles = makeStyles(styles);

// 1 student only one classroom
function EditStudent({ student, open, handleClose, classroom }) {
    const classes = useStyles();
    const disPatch = useDispatch();
    const { token } = useSelector(state => state.token);
    const [openAvatarBox, setOpenAvatarBox] = useState(false);
    const [studentInfor, setStudentInfor] = useState({ name: student.name, avatar: student.avatar, err: '', loading: false });
    const { name, avatar, err, loading } = studentInfor;
    const [openInviteParentModal, setOpenInviteParentModal] = useState(false);
    const handleOpenAvatarBox = () => {
        setOpenAvatarBox({
            [`openAvatar-${student._id}`]: true,
        });
    };

    const handleCloseAvatarBox = () => {
        setOpenAvatarBox({
            [`openAvatar-${student._id}`]: false,
        });
    };

    function handleChange(e) {
        setStudentInfor({
            ...studentInfor,
            [e.target.name]: e.target.value,
            err: '',
            loading: false
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name.length === 0) {
            return setStudentInfor({
                ...studentInfor,
                [e.target.name]: e.target.value,
                err: "Tên học sinh không được trống",
                loading: false,
            })
        }

        if (name.trim().split(' ').length <= 1) {
            return setStudentInfor({
                ...studentInfor,
                [e.target.name]: e.target.value,
                err: "Tên học sinh bao gồm phải có họ và tên ",
                loading: false,
            })
        }
        for (let i = 0; i < classroom.students.length; i++) {
            if (classroom.students[i].name.toLowerCase() !== student.name.toLowerCase()) {
                if (classroom.students[i].name.toLowerCase() === name.toLowerCase()) {
                    return setStudentInfor({
                        ...studentInfor,
                        [e.target.name]: e.target.value,
                        err: "Tên học này sinh đã tồn tại",
                        loading: false,
                    })
                }
            }
        }

        try {
            setStudentInfor({
                ...studentInfor,
                err: '',
                loading: true,
            })
            await axios.patch(`/class/edit_student/${student.classId}`, {
                idStudent: student._id,
                name
            }, {
                headers: {
                    Authorization: token
                }
            })
            setStudentInfor({
                ...studentInfor,
                loading: false,
            })
            disPatch(classAction.editStudentInfor(name, student._id, student.classId));
            ShowToastifySuccess("👨‍🏫 Thay đổi thành công");
        } catch (err) {
            if (err) console.log(err);
        }
    }

    const removeStudent = async (idStudent) => {
        if (window.confirm(`Bạn có muốn xóa ${student.name}`)) {
            try {
                await axios.patch(`/class/delete_student/${student.classId}`, {
                    idStudent,
                }, {
                    headers: {
                        Authorization: token
                    }
                })
            } catch (err) {
                console.log(err.response.data);
            }
            disPatch(classAction.removeStudent(idStudent, student.classId));
            handleClose();
        }
    }

    function hanldeOpenInviteParentModal() {
        setOpenInviteParentModal({
            [`inviteOpen-${student._id}`]: true,
        })
    }
    function hanldeCloseInviteParentModal() {
        setOpenInviteParentModal({
            [`inviteOpen-${student._id}`]: false,
        })
    }

    useEffect(() => {
        setStudentInfor({
            name,
            avatar,
            err: '',
            loading: false
        })
    }, [open, name, avatar])
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open ? open : false}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <div className={classes.heading}>
                            <h2>{capitalizeTheFirstLetterOfEachWord(student.name)}</h2>
                            <i className='bx bx-x' onClick={handleClose}></i>
                        </div>
                        <div className={classes.content}>
                            <div className={classes.contentLeft}>
                                <div className={classes.editImage} onClick={handleOpenAvatarBox}>
                                    <img src={student.avatar} alt='studentavatar'></img>
                                </div>
                                <SelectAvatarBox student={student} open={openAvatarBox ? openAvatarBox[`openAvatar-${student._id}`] : false} handleClose={handleCloseAvatarBox} />
                                <button className={classes.buttonViewReport}>
                                    <Link style={{ "color": "rgb(0, 178, 247)", }} to={`/classroom/${classroom._id}/dashboard/reports/${student._id}`}>
                                        Xem báo cáo
                                    </Link>
                                </button>
                            </div>
                            <div className={classes.contentRight}>
                                <div className={classes.box}>
                                    <div className={classes.group}>
                                        <label htmlFor='name'>
                                            Họ và tên
                                        </label>
                                        <input onChange={handleChange} type='text' name='name' value={capitalizeTheFirstLetterOfEachWord(name)}></input>
                                        {err && <p style={{ fontSize: '14px', color: 'rgb(255, 88, 84)' }}>{err}</p>}
                                    </div>
                                </div>
                                <div className={classes.box}>
                                    <div className={classes.group}>
                                        <label>
                                            Trong lớp học
                                        </label>
                                        <div className={classes.warp}>
                                            <div className={classes.inClass}>
                                                {classroom.name}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.box}>
                                    <div className={classes.group}>
                                        <label>
                                            Phụ huynh
                                        </label>

                                        <div className={classes.warp}>
                                            {student.parents.map((studentp) => {
                                                return <div className={studentp.status === 1 ? classes.parentactive : classes.parentactived} key={studentp}>
                                                    {studentp.status === 1 ?
                                                        <i className='bx bxs-user-x'></i> :
                                                        <i className='bx bxs-user-check' ></i>
                                                    }
                                                    <span>
                                                        {studentp.email} ({studentp.status === 1 ? "Đang mời" : "Đã mời"})
                                                    </span>
                                                </div>
                                            })}
                                            <div className={classes.addParent} onClick={hanldeOpenInviteParentModal}>
                                                <i className='bx bxs-plus-circle'></i>
                                                <span >Kết nối với phụ huynh</span>
                                            </div>
                                            <InviteParentModal
                                                open={openInviteParentModal ? openInviteParentModal[`inviteOpen-${student._id}`] : false}
                                                handleClose={hanldeCloseInviteParentModal}
                                                student={student}
                                                classroom={classroom}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.bottom}>
                            <p onClick={() => removeStudent(student._id)} className={classes.remove}>Xóa học sinh khỏi lớp học</p>
                            <div className={classes.bottomControl}>
                                <p className={classes.cancel} onClick={handleClose}>Hủy bỏ</p>
                                <button disabled={loading} className={!loading ? classes.save : classes.buttonDisable} onClick={handleSubmit}>Lưu lại</button>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    )
}

export default EditStudent
