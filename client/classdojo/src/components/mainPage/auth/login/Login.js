import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import registerLogoImage from '../../../../assets/img/logo.svg'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { isEmail, isEmpty } from '../../../../ultis/validations';
import { ShowSuccessMessage, ShowErrorMessage } from '../../../../ultis/notify';

// Redux
import * as auth from '../../../../redux/actions/authAction'

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styles from './styles'
const state = {
    email: '',
    password: '',
    err: '',
    success: '',
    loading: false,
}
const forgotPassword = {
    forgotEmail: '',
    forgotErr: '',
    forgotSuccess: '',
    forgotLoading: false,
}

const useStyles = makeStyles(styles);

function Login() {
    const { role } = useParams();
    const [user, setUser] = useState(state);
    const [forgot, setForgot] = useState(forgotPassword);
    const [openForgot, setOpenForgot] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const { email, password, err, success, loading } = user;
    const { forgotEmail, forgotErr, forgotSuccess, forgotLoading } = forgot;
    const classes = useStyles();

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        if (isEmpty(email) || isEmpty(password)) {
            return setUser({
                ...user,
                err: "hãy điền hết các thông tin",
                success: "",
            })
        }
        if (!isEmail(email)) {
            return setUser({
                ...user,
                err: "Email không hợp lệ", success: ''
            })
        }
        try {
            setUser({
                ...user,
                loading: true,
            })
            var res;
            if (role === 'teacher') {
                res = await axios.post('/user/login_teacher', {
                    email, password
                })
                localStorage.setItem("firstlogin", true);
                dispatch(auth.login());
                history.push('/');
            } else {
                res = await axios.post('/user/login_parent', {
                    email, password
                })
                localStorage.setItem("firstlogin", true);
                dispatch(auth.login());
                history.push('/');
            }
            setUser({
                ...user,
                success: res.data.msg,
                loading: false,
            });
            
        } catch (err) {
            if (err) {
                setUser({
                    ...user,
                    err: err.response.data.msg, success: ''
                })
            }
        }
    }
    const onHandleChange = async (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
            err: '',
            success: '',
        })
    }

    const onHandleFotgotSubmit = async (e) => {
        e.preventDefault();
        if (isEmpty(forgotEmail)) {
            if (isEmpty(forgotEmail)) {
                return setForgot({
                    ...forgot,
                    forgotErr: "hãy điền hết các thông tin",
                    forgotSuccess: "",
                })
            }
        }

        if (!isEmail(forgotEmail)) {
            return setForgot({
                ...forgot,
                forgotErr: 'Email không đúng định dạng',
                forgotSuccess: '',
            })
        }
        console.log(email);
        try {
            setForgot({
                ...forgot,
                forgotLoading: true,
            })
            const res = await axios.post('/user/forgot_password', {
                email: forgotEmail
            })
            setForgot({
                ...forgot,
                forgotSuccess: res.data.msg,
                forgotLoading: false,
            })
        } catch (err) {
            if (err) {
                setForgot({
                    ...forgot,
                    forgotErr: err.response.data.msg,
                    forgotSuccess: '',
                })
            };
        }
    }

    const onHandleForgotChange = (e) => {
        setForgot({
            ...forgotPassword,
            [e.target.name]: e.target.value,
            forgotErr: '',
            forgotSuccess: '',
        });
    }

    function openForgotModal() {
        setOpenForgot(true);
    }
    function closeForgotModal() {
        setOpenForgot(false);
    }

    return (
        <div className='register'>
            <div className="register__header">
                <Link to='/'>
                    <img alt="logo-regiser" src={registerLogoImage}></img>
                </Link>
            </div>
            <h2 className="register__title login__title">{(role === 'parent') ? 'Đăng nhập với tư cách là phụ huynh' : 'Đăng nhập với tư cách là giáo viên'}</h2>
            {err ? ShowErrorMessage(err) : ''}
            {success ? ShowSuccessMessage(success) : ''}
            {loading ? (<div className='login__loading' ><img className='login__loading-img' src="https://res.cloudinary.com/dxnfxl89q/image/upload/v1622274370/Classdojo/loading_umu1sx.gif" alt='forgot-loading'></img></div>) : ''}
            <div className='register__form login__form'>
                <form onSubmit={onHandleSubmit} >
                    <div className='register__form-group login__form-group'>
                        <input onChange={onHandleChange} type='email' name='email' placeholder="Email" defaultValue={email}></input>
                    </div>
                    <div className='register__form-group login__form-group'>
                        <input onChange={onHandleChange} type='password' name='password' placeholder="Mật khẩu" defaultValue={password} autoComplete='true'></input>
                    </div>
                    <p className='form__forgot' onClick={openForgotModal}>
                        Quên mật khẩu?
                    </p>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={openForgot}
                        onClose={closeForgotModal}
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={openForgot}>
                            <div className={classes.paper}>
                                <img src={registerLogoImage} alt='logo' className={classes.image}></img>
                                <p className={classes.detail}>Đặt lại mật khẩu</p>
                                {forgotLoading ? (<div className={classes.loadingWrap}><img className={classes.loadingImg} src="https://res.cloudinary.com/dxnfxl89q/image/upload/v1622274370/Classdojo/loading_umu1sx.gif" alt='forgot-loading'></img></div>) : ''}
                                {forgotSuccess ? ShowSuccessMessage('Vui lòng kiểm tra email của bạn để biết hướng dẫn về cách đặt lại mật khẩu của bạn!    ') : ''}
                                {forgotErr ? (<div style={{ marginTop: '40px' }}> {ShowErrorMessage(forgotErr)}</div>) : ''}
                                <div className={classes.group}>
                                    <div className='forgot__form-group  '>
                                        <input onChange={onHandleForgotChange} type='email' name='forgotEmail' placeholder="Email" defaultValue={forgot.forgotEmail} autoComplete='true'></input>
                                    </div>
                                    <div className='register__form-group forgot__form-group'>
                                        <button onClick={onHandleFotgotSubmit} type="submit" disabled={forgotLoading} className={forgotLoading ? 'register__form-button--disable' : ''}>
                                            Đặt lại mật khẩu
                                        </button>
                                    </div>
                                </div>                                
                            </div>
                        </Fade>
                    </Modal>
                    <div className='register__form-group login__form-group'>
                        <button type="submit" disabled={loading} className={loading ? 'register__form-button--disable' : ''}>
                            Đăng nhập
                        </button>
                    </div>
                </form>

            </div>
            <div className='register__indicator'></div>
            <p className='register__haveacc login__haveacc'>
                Chưa có tài khoản?
                {role === 'teacher' ?
                    <Link to='/register/teacher'>Đăng ký ở đây</Link> :
                    <Link to='/register/parent'>Đăng ký ở đây</Link>}
            </p>
        </div >
    )
}

export default Login
