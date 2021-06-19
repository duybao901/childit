import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import childitLogo from '../../assets/img/logo.svg'
import teacherBadge from '../../assets/img/teacher_badge.png'
import parentBadge from '../../assets/img/parent_badge.png'
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styles from './styles'

const useStyles = makeStyles(styles);

function Header() {
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    const classes = useStyles();
    const auth = useSelector(state => state.auth);
    const { user, isLoggid } = auth;
    function openRegisterModal() {
        setOpenRegister(true);
    }

    function closeRegisterModal() {
        setOpenRegister(false);
    }

    function openLoginModal() {
        setOpenLogin(true);
    }

    function closeLoginModal() {
        setOpenLogin(false);
    }
    return (
        <div>
            <div className="main__header">
                <div className="main__header-narvigation">
                    <Link to="" className="narvigation__logo"><img src={childitLogo} alt='logo' /></Link>
                    <div className='header__menu'>
                        <Link to='' className="narvigation__menu"><span>Tìm hiểu thêm</span></Link>
                        <Link to='' className="narvigation__menu"><span>Tài nguyên</span></Link>
                        {isLoggid ?
                            (<Link to={auth.isTeacher ? `/lauchpad` : auth.isParent ? `/story/all` : ""} className="narvigation__menu header__menu-welcome"><span>Chào mừng, {user.name}! Vào lớp thôi</span></Link>)
                            :
                            (<Fragment>
                                <button id="signin" className="narvigation__menu narvigation__signin" onClick={openLoginModal}>Đăng nhập</button>
                                <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    className={classes.modal}
                                    open={openLogin}
                                    onClose={closeLoginModal}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                        timeout: 500,
                                    }}
                                >
                                    <Fade in={openLogin}>
                                        <div className={classes.paper}>
                                            <img src={childitLogo} alt='logo' className={classes.image}></img>
                                            <p className={classes.detail}>Đăng nhập với tư cách là...</p>
                                            <div className={classes.group}>
                                                <Link to='/login/teacher'>
                                                    <img src={teacherBadge} alt='teach__badge'></img>
                                                    <p style={{ marginTop: '10px' }}>Giáo Viên</p>
                                                </Link>
                                                <Link to='/login/parent'>
                                                    <img src={parentBadge} alt='teach__badge'></img>
                                                    <p style={{ marginTop: '10px' }}>Phụ Huynh</p>
                                                </Link>
                                            </div>
                                        </div>
                                    </Fade>
                                </Modal>
                                <button id="signup" className="narvigation__menu narvigation__signup" onClick={openRegisterModal}>Đăng ký</button>
                                <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    className={classes.modal}
                                    open={openRegister}
                                    onClose={closeRegisterModal}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                        timeout: 500,
                                    }}
                                >
                                    <Fade in={openRegister}>
                                        <div className={classes.paper}>
                                            <img src={childitLogo} alt='logo' className={classes.image}></img>
                                            <p className={classes.detail}>Đăng ký với tư cách là...</p>
                                            <div className={classes.group}>
                                                <Link to='/register/teacher'>
                                                    <img src={teacherBadge} alt='teach__badge'></img>
                                                    <p style={{ marginTop: '10px' }}>Giáo Viên</p>
                                                </Link>
                                                <Link to='/register/parent'>
                                                    <img src={parentBadge} alt='teach__badge'></img>
                                                    <p style={{ marginTop: '10px' }}>Phụ Huynh</p>
                                                </Link>
                                            </div>
                                        </div>
                                    </Fade>
                                </Modal>
                            </Fragment>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
