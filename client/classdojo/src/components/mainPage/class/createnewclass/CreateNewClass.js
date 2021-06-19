import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import * as classAction from '../../../../redux/actions/classAction';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: '500px',
        outline: 'none',
        borderRadius: '5px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
    },
    heading: {
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderBottom: '1px solid rgb(229, 229, 229)',
        '& h2': {
            fontSize: '20px',
            fontFamily: "'ProximaNova', 'Helvetica Neue', Helvetica, Arial, sans- serif",
            color: '#2c2a50',
        },
        '& i': {
            fontSize: '30px',
            color: 'rgb(170, 176, 216)',
            cursor: 'pointer',
            opacity: '0.7',
            '&:hover': {
                opacity: '1',
            }
        }
    },
    form: {
        padding: '20px',
    },
    formGroup: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        marginBottom: '30px',
        '& label': {
            marginBottom: '5px',
            fontSize: '14px',
            fontFamily: "'ProximaNova', 'Helvetica Neue', Helvetica, Arial, sans- serif",
            color: '#2c2a50',
        },
        '& input': {
            "width": "100%",
            "fontFamily": "ProximaNova, \"Helvetica Neue\", Helvetica, Arial, sans-serif",
            "fontSize": "16px",
            "fontWeight": "normal",
            "lineHeight": "22px",
            "padding": "6px 10px",
            "borderRadius": "5px",
            "boxShadow": "none",
            "border": "1px solid rgb(234, 236, 245)",
            "outline": "none",
            "height": "36px",
            "backgroundColor": "rgb(247, 248, 255)"
        },
        '& input:focus': {
            "border": "1px solid rgb(0, 178, 247)",
        },
        '& select': {
            "width": "100%",
            "fontFamily": "ProximaNova, \"Helvetica Neue\", Helvetica, Arial, sans-serif",
            "fontSize": "16px",
            "fontWeight": "normal",
            "lineHeight": "22px",
            "padding": "6px 10px",
            "borderRadius": "5px",
            "boxShadow": "none",
            "border": "1px solid rgb(234, 236, 245)",
            "outline": "none",
            "height": "36px",
            "backgroundColor": "rgb(247, 248, 255)"
        },
        '& select:focus': {
            "border": "1px solid rgb(0, 178, 247)",
        }
    },
    save: {
        'float': 'right',
        "width": '150px',
        "userSelect": "none",
        "fontWeight": "600",
        "display": "inline-block",
        "outline": "none",
        "border": "1px solid rgb(234, 236, 245)",
        "fontFamily": "ProximaNova, \"Helvetica Neue\", Helvetica, Arial, sans-serif",
        "fontSize": "16px",
        "padding": "9px 10px",
        "borderRadius": "200px",
        "boxShadow": "none",
        "textAlign": "center",
        "color": "white",
        "backgroundColor": " rgb(0, 178, 244)",
        "marginLeft": "auto",
        "cursor": 'pointer',
        "&:hover": {
            "backgroundColor": "rgb(2, 180, 255)",
        }
    },
    buttonDisable: {
        'float': 'right',
        "width": '150px',
        "userSelect": "none",
        "fontWeight": "600",
        "display": "inline-block",
        "outline": "none",
        "fontFamily": "ProximaNova, \"Helvetica Neue\", Helvetica, Arial, sans-serif",
        "fontSize": "16px",
        "padding": "9px 10px",
        "borderRadius": "200px",
        "boxShadow": "none",
        "textAlign": "center",
        "color": "white",
        "marginLeft": "auto",
        "&:hover": {
            "backgroundColor": "rgb(2, 180, 255)",
        },
        cursor: 'wait !important',
        "backgroundColor": "rgb(234, 236, 245) !important",
        border: "1px solid rgb(234, 236, 245) !important",
    }
}));

const initState = {
    nameClass: '',
    grade: '',
}

function CreateNewClass() {
    const disPatch = useDispatch();
    const { grades } = useSelector(state => state.grade);
    const { token } = useSelector(state => state.token);
    const [state, setState] = useState(initState);
    const { nameClass, grade } = state;
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onHandleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const res = await axios.post('/class/create_class', {
                name: state.nameClass,
                gradeId: state.grade
            }, {
                headers: {
                    Authorization: token
                }
            })
            setLoading(false);
            setState({
                ...state,
                nameClass: '',
                grade: '',
            })
            disPatch(classAction.createNewClass(res.data.classroom));
            handleClose();
        } catch (err) {
            if (err) console.log(err.response);
        }
    }
    return (
        <React.Fragment>
            <div className='classes__newclass classes__col' onClick={handleOpen}>
                <img src="https://teach-static.classdojo.com/0e34831b8da61499a5a01525b79183de.png" alt='new-classs'></img>
                <p>Tạo lớp mới</p>
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
                        <div className={classes.heading}>
                            <h2>Tạo lớp học mới</h2>
                            <i className='bx bx-x' onClick={handleClose}></i>
                        </div>
                        <form className={classes.form} onSubmit={onHandleSubmit} >
                            <div className={classes.formGroup}>
                                <label htmlFor="nameClass">Tên lớp</label>
                                <input required value={nameClass} onChange={onHandleChange} type='text' name='nameClass'></input>
                            </div>
                            <div className={classes.formGroup}>
                                <label htmlFor="grade">Lớp</label>
                                <select onChange={onHandleChange} name='grade' required value={grade}>
                                    <option value="">Chọn lớp học</option>
                                    {grades && grades.map((grade) => {
                                        return <option key={grade._id} value={grade._id}>
                                            {grade.gradeName}
                                        </option>
                                    })}
                                </select>
                            </div>
                            <div className={classes.formGroup} style={{ marginBottom: '0px' }}>
                                <button disabled={loading} className={!loading ? classes.save : classes.buttonDisable}>Tạo lớp học</button>
                            </div>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </React.Fragment>
    )
}

export default CreateNewClass

