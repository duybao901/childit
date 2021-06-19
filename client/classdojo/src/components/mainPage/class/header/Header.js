import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import * as authAction from '../../../../redux/actions/authAction'
// Material UI
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountSetting from '../accountsetting/AccountSetting';

function Header() {
    const disPatch = useDispatch();
    const params = useParams();
    const { id } = params;
    const auth = useSelector(state => state.auth);
    const { avatar } = auth.user;
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const { classes } = useSelector(state => state.classes);
    const [classroom, setClassRoom] = useState({});

    useEffect(() => {
        if (params) {
            classes.forEach(classroom => {
                if (classroom._id === id) {
                    setClassRoom(classroom);
                }
            })
        }
    }, [id, params, classes])
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);

    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpen = () => {
        setAnchorEl(null);
        setOpen(true);
    };

    const logoutUser = async () => {
        setAnchorEl(null);
        disPatch(authAction.logout());
        await axios.get("/user/logout");
        localStorage.clear('firstlogin');
        window.location.href = '/';
    }

    return (
        <div className="main__header main__header--lauch">
            <div className="main__header-narvigation">
                {!id ? <Link to='#'>
                    <img src="https://res.cloudinary.com/dxnfxl89q/image/upload/v1622282647/Classdojo/logo_qauuhi.svg" alt="logo" width="150" height="45" />
                </Link> :
                    <div className="main__header-narvigation-goback">
                        <Link to='/lauchpad'>
                            <p>
                                <i className='bx bxs-chevron-left'></i>
                                <span>{classroom.name}</span>
                            </p>
                        </Link>
                        <span className="main__header-narvigation-goback-stlength">
                            {classroom.students && classroom.students.length} Học sinh
                        </span>
                    </div>
                }
                <div className="narvigation__info" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <div className='main__header-avatar'>
                        {avatar ? <img src={avatar.url} alt="Avatar" className='' /> : ''}
                        <i className='bx bxs-down-arrow'></i>
                    </div>
                </div>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleOpen} >
                        Cài đặt tài khoản
                    </MenuItem>
                    <MenuItem onClick={handleClose}>Thay đổi trường học</MenuItem>
                    <MenuItem onClick={logoutUser}>Đăng xuất</MenuItem>
                </Menu>
            </div>
            <AccountSetting open={open} setOpen={setOpen} />
        </div>
    )
}

export default Header
