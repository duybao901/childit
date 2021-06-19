import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styles from './styles'

import { capitalizeTheFirstLetterOfEachWord } from '../../../../ultis/letter'
import monsterList from '../../../../ultis/monsterList'
import { ShowToastifySuccess } from '../../../../ultis/notify'
import * as classAction from '../../../../redux/actions/classAction'

const useStyles = makeStyles(styles);

export default function SelectAvatarBox({ student, open, handleClose }) {
    const classes = useStyles();
    const disPatch = useDispatch();
    const { token } = useSelector(state => state.token);
    const [inforStudent, setInforStudent] = useState({ avatar: student.avatar, loading: false })
    const { avatar, loading } = inforStudent;
    function changeAvatarStudent(monster) {
        setInforStudent({
            ...inforStudent,
            avatar: monster.url,
            loading: false
        })
        disPatch(classAction.changeAvatarStudent(monster.url, student._id, student.classId));
    }

    useEffect(() => {
        // disPatch(classAction.changeAvatarStudent(student.avatar.url, student._id, student.classId));
        axios.patch(`/class/edit_student_avatar/${student.classId}`, {
            idStudent: student._id,
            avatar
        }, {
            headers: {
                Authorization: token
            }
        })
    }, [handleClose, disPatch, student.classId, avatar, token, student._id])
    const saveAvatarStudent = async () => {
        try {
            setInforStudent({
                ...inforStudent,
                loading: true,
            })
            await axios.patch(`/class/edit_student_avatar/${student.classId}`, {
                idStudent: student._id,
                avatar
            }, {
                headers: {
                    Authorization: token
                }
            })
            setInforStudent({
                ...inforStudent,
                loading: false,
            })
            disPatch(classAction.changeAvatarStudent(avatar, student._id, student.classId));
            handleClose();
            ShowToastifySuccess("👨‍🏫 Thay đổi thành công");
        } catch (err) {
            if (err) console.log(err);
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
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <div className={classes.heading}>
                            <h2>Chọn một Monster  cho {capitalizeTheFirstLetterOfEachWord(student.name)}</h2>
                            <i className='bx bx-x' onClick={handleClose}></i>
                        </div>
                        <div className={classes.content}>
                            <div className={classes.contentLeft}>
                                <div className={classes.editImage}>
                                    <img src={student.avatar} alt='studentavatar'></img>
                                </div>
                            </div>
                            <div className={classes.contentRight}>
                                <p>ChildiT Monster</p>
                                <ul className={classes.monsterList}>
                                    {monsterList.map((monster, index) => {
                                        return <li key={index} onClick={() => changeAvatarStudent(monster)}>
                                            <img src={monster.url} alt='monsteravatar'></img>
                                        </li>
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className={classes.bottom}>
                            <button disabled={loading} className={loading ? classes.buttonDisable : ''} onClick={saveAvatarStudent}>Lưu lại</button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}