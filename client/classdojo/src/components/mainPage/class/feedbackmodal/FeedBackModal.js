import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'


import { ShowToastifySuccessPlusSkillStudent } from '../../../../ultis/notify'
import { capitalizeTheFirstLetterOfEachWord, capitalize } from '../../../../ultis/letter'

import * as classAction from '../../../../redux/actions/classAction'

import EditStudentModal from '../editstudentmodal/EditStudentModal'

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styles from './styles'
import axios from 'axios';
const useStyles = makeStyles(styles);

export default function FeedBackModal({ open, handleClose, student, classroom }) {
    const classes = useStyles();
    const disPatch = useDispatch();
    const { token } = useSelector(state => state.token);
    const { isPlus } = useSelector(state => state.classes);
    const [openModalEditStudent, setOpenModalEditStudent] = useState(false);

    const handleOpenModalEditStudent = (idOpen) => {
        setOpenModalEditStudent({
            [`setOpen-${idOpen}`]: true,
        })
    };

    const handleCloseModalEditStudent = (idOpen) => {
        setOpenModalEditStudent({
            [`setOpen-${idOpen}`]: false,
        })
    };

    function openTab(e, tab) {
        const tabList = document.querySelectorAll(`ul.skills__tab-list-${student._id} li`);
        const tabListLength = tabList.length;
        const tabContent = document.querySelectorAll(`.skills__content-${student._id}`);
        const tabContentLength = tabContent.length;
        for (let i = 0; i < tabListLength; i++) {
            tabList[i].classList.remove('active');
        }
        for (let i = 0; i < tabContentLength; i++) {
            tabContent[i].classList.remove('active');
        }
        e.target.classList.add('active')
        document.getElementById(tab).classList.add('active');
    }

    useEffect(() => {
        if (document.getElementById(`skill-df-open-${student._id}`)) {
            document.getElementById(`skill-df-open-${student._id}`).click();
        }
    }, [open, student])

    const plusSkillStudent = async (skill) => {
        try {
            disPatch({ type: 'IS_PLUS' })
            await axios.post(`/class/plus_skill/${classroom._id}`, {
                idStudent: student._id,
                name: skill.name,
                number: skill.number,
                avatar: skill.avatar
            }, {
                headers: {
                    Authorization: token
                }
            });
            handleClose()
            disPatch(classAction.plusSkillStudent(classroom._id, student._id, skill));
            ShowToastifySuccessPlusSkillStudent(`👨‍🏫 Phản hồi cho ${student.name} thành công`)
            disPatch({ type: 'NO_PLUS' })
        } catch (err) {
            if (err) console.log(err.response)
        }
    }
    return (
        <div>
            <Modal
                keepMounted={true}
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
                            <h2>Đưa ra phản hồi cho {capitalizeTheFirstLetterOfEachWord(student.name)}</h2>
                            <p className="feedback__editstudent-p" onClick={() => handleOpenModalEditStudent(student._id)}>Chỉnh sửa học sinh</p>
                        </div>
                        <EditStudentModal classroom={classroom} student={student} idOpen={student._id} open={openModalEditStudent ? openModalEditStudent[`setOpen-${student._id}`] : false} handleClose={() => handleCloseModalEditStudent(student._id)} />
                        <div className='skills'>
                            <div className="skills__tab-list">
                                <ul className={`skills__tab-list-${student._id}`}>
                                    <li onClick={(e) => openTab(e, `pos-${student._id}`)} id={`skill-df-open-${student._id}`}>
                                        Tích cực
                                    </li>
                                    <li onClick={(e) => openTab(e, `neg-${student._id}`)}>
                                        Tiêu cực
                                    </li>
                                </ul>
                            </div>
                            <div className={`skills__content skills__content-${student._id}`} id={`pos-${student._id}`}>
                                <div className='skills__content-list'>
                                    {isPlus !== true ? classroom.skills && classroom.skills.map((skill, index) => {
                                        if (parseInt(skill.number) > 0) {
                                            return <div onClick={() => plusSkillStudent(skill)} key={index} className='skills__content-list-item feedback__skill'>
                                                <div className='skill__item-infor'>
                                                    <div className="skill__item-infor-img">
                                                        <img src={skill.avatar.url} alt='skillavatar'></img>
                                                    </div>
                                                    <p>{capitalize(skill.name)}</p>
                                                    <span className="skill__item-infor-point">{skill.number}</span>
                                                </div>
                                            </div>
                                        } else {
                                            return '';
                                        }
                                    }) : (<div style={{ textAlign: 'center', width: '100%' }}>
                                        <img className='control__image-loading' src="https://res.cloudinary.com/dxnfxl89q/image/upload/v1622274370/Classdojo/loading_umu1sx.gif" alt='loading-avatar'></img>
                                        <p className='p_is_plus__skill' style={{ marginBottom: '5px' }}>Hệ thống đang đang ghi điểm </p>
                                        <p className='p_is_plus__skill'> Xin vui lòng chờ trong giây lát...</p>
                                        <img style={{ width: '100px', height: '100px', objectFit: 'cover' }} alt='pluskill' src="https://res.cloudinary.com/dxnfxl89q/image/upload/v1622700390/Classdojo/ersuzgq7aw4ecn1hgetw.png"></img>
                                    </div>)}
                                </div>
                            </div>
                            <div className={`skills__content skills__content-${student._id}`} id={`neg-${student._id}`}>
                                <div className='skills__content-list'>
                                    {isPlus !== true ? classroom.skills && classroom.skills.map((skill, index) => {
                                        if (parseInt(skill.number) < 0) {
                                            return <div onClick={() => plusSkillStudent(skill)} key={index} className='skills__content-list-item feedback__skill'>
                                                <div className='skill__item-infor'>
                                                    <div className="skill__item-infor-img">
                                                        <img src={skill.avatar.url} alt='skillavatar'></img>
                                                    </div>
                                                    <p>{capitalize(skill.name)}</p>
                                                    <span className="skill__item-infor-point skill__item-infor-point-nega">{skill.number}</span>
                                                </div>
                                            </div>
                                        } else {
                                            return '';
                                        }
                                    }) : (<div style={{ textAlign: 'center', width: '100%' }}>
                                        <img className='control__image-loading' src="https://res.cloudinary.com/dxnfxl89q/image/upload/v1622274370/Classdojo/loading_umu1sx.gif" alt='loading-avatar'></img>
                                        <p className='p_is_plus__skill' style={{ marginBottom: '5px' }}>Hệ thống đang đang ghi điểm </p>
                                        <p className='p_is_plus__skill'> Xin vui lòng chờ trong giây lát...</p>
                                        <img style={{ width: '100px', height: '100px', objectFit: 'cover' }} alt='pluskill' src="https://res.cloudinary.com/dxnfxl89q/image/upload/v1622700390/Classdojo/ersuzgq7aw4ecn1hgetw.png"></img>
                                    </div>)}
                                </div>
                            </div>
                        </div>
                        <div >
                            <button className={"editstudent__close"} onClick={handleClose}>Đóng</button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
