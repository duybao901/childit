import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';

import { ShowSuccessMessage, ShowErrorMessage } from '../../../../ultis/notify';
import { isLength, isEmpty, isMatch } from '../../../../ultis/validations'

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styles from './styles';

import EditProfile from '../editprofile/EditProfile'

const useStyles = makeStyles(styles);

const passwordState = {
    newPassword: '',
    cfPassword: '',
    err: '',
    success: '',
    loading: false
}

function AccountSetting({ open, setOpen }) {
    const classes = useStyles();
    const { token } = useSelector(state => state.token)
    const [passwordChange, setPasswordChange] = useState(passwordState);
    const { newPassword, cfPassword, err, success, loading } = passwordChange;
    const handleCloseModal = () => {
        setOpen(false);
    };
    // Open Tab
    function openTab(e, tabName) {
        setPasswordChange({
            ...newPassword,
            newPassword: '',
            cfPassword: '',
            success: '',
            err: '',
            loading: false,
        })
        var tabList = document.querySelectorAll('.account__tab-list li');
        var tabListLength = tabList.length;
        var tabContentList = document.querySelectorAll('.account__tab-content');
        var tabContentListLength = tabContentList.length;
        for (let i = 0; i < tabListLength; i++) {
            tabList[i].classList.remove('active');
        }
        for (let i = 0; i < tabContentListLength; i++) {
            tabContentList[i].classList.remove('account__tab-content--active')
        }
        document.getElementById(tabName).classList.add('account__tab-content--active');
        e.target.classList.add('active');
    }
    useEffect(() => {
        if (document.getElementById('default_open')) {
            document.getElementById('default_open').click();
        }
    }, [open])

    const handleChangePassword = async (e) => {
        setPasswordChange({
            ...passwordChange,
            [e.target.name]: e.target.value,
            err: '',
            success: ''
        })
    }

    const handleSubmitPassword = async (e) => {
        e.preventDefault();
        if (isEmpty(newPassword) || isEmpty(cfPassword)) {
            return setPasswordChange({
                ...passwordChange,
                [e.target.name]: e.target.value,
                err: 'M???t kh???u kh??ng ???????c tr???ng',
            })
        }
        if (isLength(newPassword)) {
            return setPasswordChange({
                ...passwordChange,
                [e.target.name]: e.target.value,
                err: 'M???t kh???u ??t nh???t 8 k?? t???',
            })
        }
        if (!isMatch(newPassword, cfPassword)) {
            return setPasswordChange({
                ...passwordChange,
                [e.target.name]: e.target.value,
                err: 'M???t kh???u kh??ng kh???p',
            })
        }
        try {
            setPasswordChange({
                ...passwordChange,
                [e.target.name]: e.target.value,
                err: '',
                success: '',
                loading: true,
            })
            const res = await axios.post('/user/reset_password', { password: newPassword }, {
                headers: {
                    Authorization: token
                }
            })
            setPasswordChange({
                newPassword: "",
                cfPassword: "",
                err: '',
                success: res.data.msg,
                loading: false,
            })
        } catch (err) {
            return setPasswordChange({
                ...passwordChange,
                [e.target.name]: e.target.value,
                err: err.response.data.msg,
                success: '',
                loading: false,
            })
        }
    }

    return (
        <React.Fragment>
            <div>
                <Modal
                    keepMounted={true}
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleCloseModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <div className="account__header">
                                <h2>C??i ?????t t??i kho???n</h2>
                                <i className='bx bx-x' onClick={handleCloseModal}></i>
                            </div>
                            <div className="account__tab">
                                <ul className="account__tab-list">
                                    <li onClick={(e) => openTab(e, 'profile')} id='default_open'>
                                        Ch???nh s???a h??? s??
                                    </li>
                                    <li onClick={(e) => openTab(e, 'change_password')}>
                                        ?????i m???t kh???u
                                    </li>
                                    <li onClick={(e) => openTab(e, 'privacy')}>
                                        Quy???n ri??ng t?? & ??i???u kho???n
                                    </li>
                                </ul>
                                <div className="account__tab-content" id='profile' >
                                    <EditProfile />
                                </div>
                                <div className="account__tab-content" id='change_password'>
                                    {err && ShowErrorMessage(err)}
                                    {success && ShowSuccessMessage(success)}
                                    {loading && <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <img src="https://res.cloudinary.com/dxnfxl89q/image/upload/v1622274370/Classdojo/loading_umu1sx.gif" alt='profile_loading'></img>
                                    </div>}
                                    <form className="changepw__form" onSubmit={handleSubmitPassword}>
                                        <div className='changepw__form-group'>
                                            <label htmlFor='newPassword'>M???t kh???u m???i</label>
                                            <input onChange={handleChangePassword} autoComplete='true' type='password' name='newPassword' id='newPassword' value={newPassword}></input>
                                        </div>
                                        <div className='changepw__form-group'>
                                            <label htmlFor='cfPassword'>Nh???p l???i m???t kh???u</label>
                                            <input onChange={handleChangePassword} autoComplete='true' type='password' name='cfPassword' id='cfPassword' value={cfPassword}></input>
                                        </div>
                                        <div className='changepw__form-group'>
                                            <label></label>
                                            <button className='changepw__form-button'>L??u thay ?????i</button>
                                        </div>

                                    </form>
                                </div>
                                <div className="account__tab-content" id='privacy'>
                                    Quy???n ri??ng t?? & ??i???u kho???n
                                </div>
                            </div>
                        </div>
                    </Fade>
                </Modal>
            </div>
        </React.Fragment>
    );
}

export default AccountSetting
