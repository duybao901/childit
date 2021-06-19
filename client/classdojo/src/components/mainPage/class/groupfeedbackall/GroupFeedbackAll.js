import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import { capitalize } from '../../../../ultis/letter'
import { ShowToastifyPlussSkillAllStudent } from '../../../../ultis/notify'

import * as classAction from '../../../../redux/actions/classAction'


// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styles from './styles'
const useStyles = makeStyles(styles);
export default function GroupFeedbackAll({ students, open, handleClose, group, classroom }) {
    const classes = useStyles();
    const disPatch = useDispatch();
    const { token } = useSelector(state => state.token);
    const [loading, setLoading] = useState(false);


    function openTab(e, tab) {
        const tabList = document.querySelectorAll(`ul.skills__tab-list-${group._id} li`);
        const tabListLength = tabList.length;
        const tabContent = document.querySelectorAll(`.skills__content-${group._id}`);
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
        if (document.getElementById(`skill-df-open-${group._id}`)) {
            document.getElementById(`skill-df-open-${group._id}`).click();
        }
    }, [open, classroom, group._id])
    const plusSkillAllStudentGroup = async (skill) => {
        try {
            setLoading(true);
            disPatch({ type: 'IS_PLUS' })
            await axios.post(`/class/plus_whole_group/${classroom._id}`, {
                name: skill.name,
                number: skill.number,
                avatar: skill.avatar,
                students
            }, {
                headers: {
                    Authorization: token
                }
            });

            disPatch(classAction.plusSkillAllGroup(classroom._id, skill, students));
            disPatch({ type: 'NO_PLUS' })
            ShowToastifyPlussSkillAllStudent("👨‍🏫 Phản hồi cho cả nhóm thành công")
            handleClose()
            setLoading(false)
        } catch (err) {
            if (err) console.log(err.response);
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
                            <h2>Đưa ra phản hồi cho {group.groupName}</h2>
                            <i className='bx bx-x' onClick={handleClose}></i>
                        </div>
                        <div className='skills'>
                            <div className="skills__tab-list">
                                <ul className={`skills__tab-list-${group._id}`}>
                                    <li onClick={(e) => openTab(e, `pos-${group._id}`)} id={`skill-df-open-${group._id}`}>
                                        Tích cực
                                    </li>
                                    <li onClick={(e) => openTab(e, `neg-${group._id}`)}>
                                        Tiêu cực
                                    </li>
                                </ul>
                            </div>
                            <div className={`skills__content skills__content-${group._id}`} id={`pos-${group._id}`}>
                                <div className='skills__content-list'>
                                    {loading !== true ? classroom.skills && classroom.skills.map((skill, index) => {
                                        if (parseInt(skill.number) > 0) {
                                            return <div onClick={() => plusSkillAllStudentGroup(skill)} key={index} className='skills__content-list-item feedback__skill'>
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
                            <div className={`skills__content skills__content-${group._id}`} id={`neg-${group._id}`}>
                                <div className='skills__content-list'>
                                    {loading !== true ? classroom.skills && classroom.skills.map((skill, index) => {
                                        if (parseInt(skill.number) < 0) {
                                            return <div onClick={() => plusSkillAllStudentGroup(skill)} key={index} className='skills__content-list-item feedback__skill'>
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
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
