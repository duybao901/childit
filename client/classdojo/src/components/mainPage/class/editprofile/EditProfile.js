import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import { ShowErrorMessage, ShowSuccessMessage } from '../../../../ultis/notify';
import { isEmpty, isEmail } from '../../../../ultis/validations'

import * as authAction from '../../../../redux/actions/authAction';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styles from './styles'
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(styles);

function EditProfile() {
    const classes = useStyles();
    const disPatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const { token } = useSelector(state => state.token)
    const { user } = auth;
    const [userEdit, setUserEdit] = useState({ ...user, err: '', success: '', loading: false });
    const [images, setImages] = useState(null);
    const [onEdit, setOnEdit] = useState(false);
    const [styleImaheUpload, setStyleImaheUpload] = useState({ display: 'none' });
    const [inforImage, setInforImage] = useState(null);
    const [loadingImage, setLoadingImage] = useState(false);
    const [loadingChangeAvatar, setLoadingChangeAvatar] = useState(false);
    const { name, email, phone, address, role, err, success, loading } = userEdit;
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setUserEdit({ ...user, err: '', success: '', loading: false })
    }, [user])

    const onHandleSubmit = async (e) => {
        e.preventDefault();

        if (isEmpty(name) || isEmpty(email) || isEmpty(phone) || isEmpty(address)) {
            return setUserEdit({
                ...userEdit,
                err: "hãy điền hết các thông tin",
                success: "",
            })
        }
        if (!isEmail(email)) {
            return setUserEdit({
                ...userEdit,
                err: "Email không hợp lệ", success: ''
            })
        }
        try {
            setUserEdit({
                ...userEdit,
                err: '',
                success: '',
                loading: true
            })

            const res = await axios.patch('/user/update_infor', {
                name,
                email,
                phone,
                address
            }, {
                headers: { Authorization: token }
            })
            setUserEdit({
                ...userEdit,
                err: '',
                success: res.data.msg,
                loading: false
            })
        } catch (err) {

            if (err) {
                return setUserEdit({
                    ...userEdit,
                    err: err.response.data.msg,
                    success: ''
                })
            }
        }
    }

    const onHandleChange = (e) => {
        setUserEdit({
            ...userEdit,
            [e.target.name]: e.target.value,
            err: '',
            success: ''
        })
    }

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    const handleCancel = async () => {
        handleClose();
        if (images != null) {
            try {
                setOnEdit(false);
                setLoadingImage(true);
                await axios.post('/api/destroy_avatar', { public_id: images.public_id });
                setLoadingImage(false);
                setImages(null);
                setInforImage(null);
                setOnEdit(false);
            } catch (err) {
                alert(err.response.data.msg);
            }
        }
    }

    const onHandleUpload = async e => {
        const file = e.target.files[0];
        if (!file) {
            return alert("Không tìm thấy hình ảnh.")
        }
        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
            // 1mb
            return alert('Định dạng tệp không chính xác.');
        }

        if (file.size > 1024 * 1024) { // 1MB
            return alert("Kích thước ảnh quá lớn ( < 1MB).")
        }
        let formData = new FormData();
        formData.append('file', file);
        try {
            setLoadingImage(true);
            const res = await axios.post("/api/upload_avatar", formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                }
            })
            setOnEdit(true);
            setLoadingImage(false);
            setImages(res.data.avatar);
            setInforImage({
                fileName: file.name,
                fileSize: file.size,
            })
        } catch (err) {
            alert(err.response.data.msg);
        }
    }

    const handleDestroyImage = async e => {
        if (images) {
            try {
                setOnEdit(false);
                setLoadingImage(true);
                await axios.post('/api/destroy_avatar', { public_id: images.public_id });
                setLoadingImage(false);
                setImages(null);
                setInforImage(null);
                setOnEdit(false);
            } catch (err) {
                alert(err.response.data.msg);
            }
        }

    }

    const uploadAvatar = async e => {
        if (onEdit) {
            try {
                setLoadingChangeAvatar(true);
                await axios.post('/user/change_avatar', {
                    avatar: {
                        ...images
                    }
                }, {
                    headers: { Authorization: token }
                })
                setLoadingChangeAvatar(false);
                setImages(null);
                setInforImage(null);
                setOnEdit(false);
                handleClose();
                authAction.fetchUser(token).then(res => {                                        
                    disPatch(authAction.getUserInfor(res));
                }).catch(err => {
                    if (err) throw err;
                })               
            } catch (err) {
                alert(err.response.data.msg)
            }
        }
    }

    useEffect(() => {
        setStyleImaheUpload({
            display: onEdit ? 'block' : 'none'
        })
    }, [onEdit])
    return (
        <div className='editpf'>
            <div className='editpf__avatar' onClick={handleOpen}>
                <div className='editpf__avatar-wrap' >
                    {user.avatar ? (<img alt='img-av' src={user.avatar.url}></img>) : ''}
                </div>
                <span>Thay đổi ảnh</span>
            </div>
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
                        <div className="editpf__avatar-control">
                            <div className='avatar__control-wrapper'>
                                <input
                                    type="file"
                                    name="file"
                                    id="file_up"
                                    onChange={onHandleUpload}
                                    className={onEdit ? 'control__have-image' : ''}
                                ></input>
                                <img
                                    style={styleImaheUpload}
                                    alt="img-upload"
                                    src={images && images.url}
                                    id=''
                                ></img>
                                {onEdit && (<Tooltip title="Xóa ảnh" placement="top">
                                    <span onClick={handleDestroyImage} >
                                        X
                                </span>
                                </Tooltip>)}
                                {loadingImage ? (<img className='control__image-loading' src="https://res.cloudinary.com/dxnfxl89q/image/upload/v1622274370/Classdojo/loading_umu1sx.gif" alt='loading-avatar'></img>) : ''}
                            </div>
                        </div>
                        {inforImage && (<div className='control__img-infor'><p>{inforImage.fileName}</p> <p>{Math.round(parseInt(inforImage.fileSize) / 1024)} KB</p></div>)}
                        {onEdit && (<div className='control__button-wrapper'>
                            <button disabled={loadingChangeAvatar} className={loadingChangeAvatar ? 'control__button control__button--disable' : 'control__button '} onClick={uploadAvatar} >
                                Tải ảnh lên
                                </button>
                        </div>)}
                       
                        <div className="editpf__avatar-cancel" onClick={handleCancel}>
                            Hủy bỏ
                        </div>
                    </div>
                </Fade>
            </Modal>
            <div>
                {err ? ShowErrorMessage(err) : ''}
                {success ? ShowSuccessMessage(success) : ''}
                {loading ?
                    (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src="https://res.cloudinary.com/dxnfxl89q/image/upload/v1622274370/Classdojo/loading_umu1sx.gif" alt='profile_loading'></img>
                        </div>
                    ) : ''}
            </div>
            <form className='editpf__form' onSubmit={onHandleSubmit}>
                <div className='editpf__form-group'>
                    <label htmlFor='name'>Họ và tên</label>
                    <input onChange={onHandleChange} type='text' name='name' id='name' defaultValue={name}></input>
                </div>
                <div className='editpf__form-group'>
                    <label htmlFor='email'>Email</label>
                    <input onChange={onHandleChange} type='email' name='email' id='email' defaultValue={email}></input>
                </div>
                <div className='editpf__form-group'>
                    <label htmlFor='phone'>Số điện thoại</label>
                    <input onChange={onHandleChange} type='text' name='phone' id='phone' defaultValue={phone}></input>
                </div>
                <div className='editpf__form-group'>
                    <label htmlFor='address'>Địa chỉ</label>
                    <input onChange={onHandleChange} type='text' name='address' id='address' defaultValue={address}></input>
                </div>
                <div className='editpf__form-group'>
                    <label htmlFor='role'>Vai trò</label>
                    <input onChange={onHandleChange} type='text' name='role' id='role' disabled value={role === 1 ? 'Giáo viên' : 'Phụ huynh'}></input>
                </div>
                <div className='editpf__form-group'>
                    <label></label>
                    <button>
                        Lưu thay đổi
                    </button>
                </div>
            </form>
        </div >
    )
}

export default EditProfile
