import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import * as classAction from '../../../../redux/actions/classAction'
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styles from './styles'

import SkillImagesList from '../../../../ultis/skill_images';
import { ShowToastifySuccess } from '../../../../ultis/notify'
const useStyles = makeStyles(styles);

export default function SkillModal({ isPos, open, handleClose, skill, classroom }) {
    const classes = useStyles();
    const disPatch = useDispatch();
    const { token } = useSelector(state => state.token)
    const [openImageBox, setOpenImageBox] = useState(false);
    var ispos = isPos ? isPos.isPos : "";
    const [skillInfor, setSkillInfor] = useState(
        {
            name: skill ? skill.name : "",
            number: skill ? skill.number : ispos ? 1 : -1,
            avatar: skill ? skill.avatar.url : "https://res.cloudinary.com/dxnfxl89q/image/upload/v1621323380/Classdojo/hdxtaavuwc4sia5rabcs.png",
            err: '',
            loading: false
        }
    )
    const { name, number, avatar, err, loading } = skillInfor;

    function handleChange(e) {
        setSkillInfor({
            ...skillInfor,
            [e.target.name]: e.target.value,
            err: '',
            loading: ''
        })
    }

    const handleSubmit = async (e) => {
        if (name.length === 0) {
            return setSkillInfor({
                ...skillInfor,
                [e.target.name]: e.target.value,
                err: 'Tên không được để trống',
                loading: false
            })
        }
        try {
            setSkillInfor({
                ...skillInfor,
                [e.target.name]: e.target.value,
                err: '',
                loading: true
            })
            if (skill) {
                // Edit Skill
                await axios.patch(`/class/edit_skill/${classroom._id}`, {
                    idSkill: skill._id,
                    name,
                    number,
                    avatar: {
                        url: avatar
                    }
                }, {
                    headers: {
                        Authorization: token
                    }
                })
                disPatch(classAction.editSkillClass(skill._id, classroom._id, name, number, avatar));
                handleClose();
                setSkillInfor({
                    ...skillInfor,
                    [e.target.name]: e.target.value,
                    err: '',
                    loading: false
                })
            } else {
                // Add Skill          
                const res = await axios.post(`/class/add_skill/${classroom._id}`, {
                    name, number, avatar: {
                        url: avatar
                    }
                }, {
                    headers: {
                        Authorization: token
                    }
                })
                disPatch(classAction.addSkillClass(classroom._id, res.data.skill));
                handleClose();
                setSkillInfor({
                    ...skillInfor,
                    [e.target.name]: e.target.value,
                    err: '',
                    loading: false
                })
            }
        } catch (err) {
            if (err) console.log(err);
        }
    }

    const handleDeleteSkill = async (e) => {
        try {
            await axios.patch(`/class/delete_skill/${classroom._id}`, {
                idSkill: skill._id,
            }, {
                headers: {
                    Authorization: token,
                }
            })
            disPatch(classAction.deleteSkillClass(classroom._id, skill._id));
            ShowToastifySuccess("👨‍🏫 Xóa kỹ năng thành công");
            handleClose();
        } catch (err) {
            if (err) console.log(err);
        }
    }

    function handleOpenImageBox() {
        setOpenImageBox(!openImageBox);
    }

    function handleCloseImageBox() {
        setOpenImageBox(false)
    }

    function changeAvatar(url) {
        setSkillInfor({
            ...skillInfor,
            avatar: url,
            err: '',
            loading: false
        })
        handleCloseImageBox();
    }



    useEffect(() => {
        setSkillInfor({
            name: skill ? skill.name : "",
            number: skill ? skill.number : ispos ? 1 : -1,
            avatar: skill ? skill.avatar.url : "https://res.cloudinary.com/dxnfxl89q/image/upload/v1621323380/Classdojo/hdxtaavuwc4sia5rabcs.png",
            err: '',
            loading: false
        })
    }, [handleClose, skill, ispos])

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
                            <h2>{skill ? "Chỉnh sửa kỹ năng" : "Thêm kỹ năng"}</h2>
                            <i className='bx bx-x' onClick={handleClose}></i>
                        </div>
                        <div className={classes.content}>
                            <div className={classes.editImage}>
                                <div className={classes.imageBox} onClick={handleOpenImageBox}>
                                    <img src={avatar} alt='skillavatar'>
                                    </img>
                                    <i className='bx bx-caret-down'></i>
                                </div>
                                <div className={openImageBox ? classes.imageBoxFadeOpen : classes.imageBoxFadeClose}>
                                    <div className={classes.ImageWrapper}>
                                        <ul className={classes.imageList}>
                                            {SkillImagesList.map((avatar, index) => {
                                                return <li key={index} onClick={() => changeAvatar(avatar.url)}>
                                                    <img src={avatar.url} alt='skillavatar'></img>
                                                </li>
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.skillInfor}>
                                <div className={classes.group}>
                                    <label htmlFor='name'></label>
                                    {err && <p className={classes.err}>{err}</p>}
                                </div>
                                <div className={classes.group}>
                                    <label htmlFor='name'>Tên</label>
                                    <input placeholder={ispos ? "Ví dụ ' Đoàn kết ' ..." : "Ví dụ ' Đánh nhau ' ..."} onChange={handleChange} id='name' name='name' value={name}></input>
                                </div>
                                <div className={classes.group}>
                                    <label htmlFor='number'>Điểm kỹ năng</label>
                                    <select onChange={handleChange} name='number' id='number' value={number}>
                                        <option value={ispos ? 1 : -1}>
                                            {ispos ? 1 : -1}
                                        </option>
                                        <option value={ispos ? 2 : -2}>
                                            {ispos ? 2 : -2}
                                        </option>
                                        <option value={ispos ? 3 : -3}>
                                            {ispos ? 3 : -3}
                                        </option>
                                        <option value={ispos ? 4 : -4}>
                                            {ispos ? 4 : -4}
                                        </option>
                                        <option value={ispos ? 5 : -5}>
                                            {ispos ? 5 : -5}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className={classes.bottom}>
                            {skill ? <p onClick={handleDeleteSkill} className={classes.remove}>Xóa kỹ năng</p> : <div></div>}
                            <div className={classes.bottomControl}>
                                <p className={classes.cancel} onClick={handleClose}>Hủy bỏ</p>
                                <button disabled={loading} className={!loading ? classes.save : classes.buttonDisable} onClick={handleSubmit}>Lưu lại</button>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
