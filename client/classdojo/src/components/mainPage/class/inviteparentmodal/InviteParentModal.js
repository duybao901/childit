import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { capitalizeTheFirstLetterOfEachWord } from '../../../../ultis/letter'
import { ShowSuccessMessage } from '../../../../ultis/notify'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import * as classAction from '../../../../redux/actions/classAction'

import styles from './styles'
const useStyles = makeStyles(styles);

export default function InviteParentModal({ open, handleClose, student, classroom }) {
    const disPatch = useDispatch();
    const classes = useStyles();
    const [infor, setInfor] = useState({ email: '', err: '', success: '', loading: false })
    const { email, err, success, loading } = infor;

    function handleChange(e) {

        setInfor({
            ...infor,
            [e.target.name]: e.target.value,
            err: '',
            success: '',
            loading: false
        })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            setInfor({
                ...infor,
                [e.target.name]: e.target.value,
                err: '',
                success: '',
                loading: true
            })
            const res = await axios.post("/user/invite_parent", {
                email,
                code: student.code,
                classId: classroom._id,
            })
            setInfor({
                ...infor,
                [e.target.name]: e.target.value,
                err: '',
                success: res.data.msg,
                loading: false
            })
            disPatch(classAction.inviteParent(res.data.parent, classroom._id))
        } catch (err) {
            if (err) setInfor({
                ...infor,
                [e.target.name]: e.target.value,
                err: err.response.data.msg,
                success: '',
                loading: false
            });
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
                            <h2>Mời phụ huynh của học sinh {capitalizeTheFirstLetterOfEachWord(student.name)}</h2>
                            <i className='bx bx-x' onClick={handleClose}></i>
                        </div>
                        <div className={classes.errBox}>
                            {loading && <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                                <img
                                    className='control__image-loading'
                                    src="https://res.cloudinary.com/dxnfxl89q/image/upload/v1622274370/Classdojo/loading_umu1sx.gif" alt='loading-avatar'>
                                </img>
                            </div>}
                            {err && <p className={classes.err} style={{ width: '100%', display: 'flex', justifyContent: 'center', color: "crimson", marginBottom: '5px' }}>{err}</p>}
                        </div>

                        <form className={classes.form} onSubmit={handleSubmit}>
                            <div className={classes.gr}>
                                <input required onChange={handleChange} placeholder="Email" type='email' name='email' value={email} ></input>
                                <button>Gửi</button>
                            </div>
                        </form>
                        {success && ShowSuccessMessage(success)}
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
