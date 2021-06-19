import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import Header from '../header/Header'

// Material UI
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styles from './styles';

import EditClass from '../editclass/EditClass'
import AddStudentModal from '../addstudentmodal/AddStudentModal'
import Student from '../student/Student'
import FeedBackModalAllClass from '../feedbackmodalallclass/FeedBackModalAllClass';
import Groups from '../groups/Groups'


import * as groupAction from '../../../../redux/actions/groupAction'

const useStyles = makeStyles(styles);


function ClassRoom() {
    const className = useStyles();
    const disPatch = useDispatch();
    const { token } = useSelector(state => state.token)
    const { id } = useParams();
    const { classes } = useSelector(state => state.classes);
    const [anchorEl, setAnchorEl] = useState(null);
    const [classroom, setClassroom] = useState("");
    const [open, setOpen] = useState(false);
    const [openModalAddStudent, setOpenModalAddStudent] = useState(false);
    const [openFBM, setOpenFBM] = useState(false);

    const handleOpenFeedBackModal = () => {
        setOpenFBM({
            [`openFBM-${classroom._id}`]: true,
        });
    };

    const handleCloseFeedBackModal = () => {
        setOpenFBM({
            [`openFBM-${classroom._id}`]: false,
        });
    };
    useEffect(() => {
        if (id) {
            classes.forEach((classroom) => {
                if (classroom._id === id) {
                    setClassroom(classroom);

                }
            })
            if (document.getElementById(`classroom__tab-list-item-default-open-${classroom._id}`)) {
                document.getElementById(`classroom__tab-list-item-default-open-${classroom._id}`).click();
            }
        }
    }, [id, classes, classroom._id])
    useEffect(() => {
        if (id) {
            const fectGroups = async () => {
                groupAction.fetchGroups(token, id).then((res) => {
                    disPatch(groupAction.getGroups(res))
                }).catch(err => {
                    if (err) console.log(err);
                })
            }
            fectGroups();
        }
    }, [id, disPatch, token])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenEditClass = () => {
        setOpen(true);
        handleClose();
    };

    const handleCloseEditClass = () => {
        setOpen(false);
    };

    function handleOpenModalAddStudent() {
        setOpenModalAddStudent(true);
    }

    function handleCloseModalAddStudent() {
        setOpenModalAddStudent(false);
    }

    function openTab(e, tabName) {

        const tabList = document.querySelectorAll('.classroom__tab-list-item');
        const tabListLength = tabList.length;
        const tabContent = document.querySelectorAll('.classroom__main-content-list');
        const tabContentLength = tabContent.length;
        for (let i = 0; i < tabListLength; i++) {
            tabList[i].classList.remove('active');
        }
        for (let i = 0; i < tabContentLength; i++) {
            tabContent[i].classList.remove('active');
        }
        e.target.classList.add('active');
        document.getElementById(tabName).classList.add('active');
    }

    return (
        <div>
            <Header id={id} />
            <div className="classroom">
                <div className="classroom__header">
                    <div className="classroom__header-container">
                        <div className='classroom__navbar'>
                            <ul>
                                <li>
                                    Phòng Học
                                </li>
                            </ul>
                        </div>
                        <div className='classroom__edit'>
                            <div className="classroom__edit-button" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                Tùy Chọn <i className='bx bx-caret-down' ></i>
                            </div>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleOpenEditClass}>Chỉnh Sửa Lớp Học</MenuItem>
                                <MenuItem onClick={handleClose}><Link to={`/classroom/${classroom._id}/dashboard/reports/all`}>Xem Báo Cáo</Link></MenuItem>
                                <MenuItem onClick={handleClose}>...</MenuItem>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
            <div className='classroom__main'>
                <div className="classroom__tab-list">
                    <h2 className="classroom__tab-list-item active"
                        onClick={(e) => openTab(e, `classroom__students-content-${classroom._id}`)}
                        id={`classroom__tab-list-item-default-open-${classroom._id}`}
                    >
                        Students
                    </h2>
                    <h2 className="classroom__tab-list-item" onClick={(e) => openTab(e, `classroom__groups-content-${classroom._id}`)}>
                        Groups
                    </h2>
                </div>

                <div className='classroom__main-content'>
                    <div className="classroom__main-content-list" id={`classroom__students-content-${classroom._id}`}>
                        {classroom.students && classroom.students.length > 0 ? <React.Fragment>
                            <div className="classroom__student" onClick={handleOpenFeedBackModal}>
                                <div className="classroom__student-img">
                                    <img src="https://teach-static.classdojo.com/fe38ededce00321c6840ba1271c1fc2f.png" alt="allclass"></img>
                                </div>
                                <span className={classroom.allPoints === 0 ? "classroom__student-point" :
                                    classroom.allPoints > 0 ? "classroom__student-point have-point-pos" :
                                        "classroom__student-point have-point-neg"}>
                                    {classroom.allPoints}
                                </span>
                                <p className="classroom__student-name">Cả Lớp</p>
                            </div>
                            <FeedBackModalAllClass open={openFBM ? openFBM[`openFBM-${classroom._id}`] : false} handleClose={handleCloseFeedBackModal} classroom={classroom} />
                            {
                                classroom.students.map((student) => {
                                    return <Student classroom={classroom} key={student._id} student={student} />
                                })
                            }
                            <div className='classroom__student classroom__new-student' onClick={handleOpenModalAddStudent} >
                                <i className='bx bxs-plus-circle'></i>
                                <p>Thêm học sinh</p>
                            </div>
                        </React.Fragment> : <div onClick={handleOpenModalAddStudent} className="classroom__addstudent">
                            <img alt='addstudent' src="https://teach-static.classdojo.com/d2729f3a8e63338873b2004e966bfd37.png">
                            </img>
                            <p>Thêm học sinh của bạn!</p>
                            <button>Thêm học sinh</button>
                        </div>}
                        <AddStudentModal open={openModalAddStudent} handleClose={handleCloseModalAddStudent} classroom={classroom} />
                    </div>
                    <div className="classroom__main-content-list" id={`classroom__groups-content-${classroom._id}`}>
                        {classroom.students && classroom.students.length > 0 ? <Groups classroom={classroom} /> : <div onClick={handleOpenModalAddStudent} className="classroom__addstudent">
                            <img alt='addstudent' src="https://teach-static.classdojo.com/d2729f3a8e63338873b2004e966bfd37.png">
                            </img>
                            <p>Thêm học sinh của bạn!</p>
                            <button>Thêm học sinh</button>
                        </div>}
                    </div>
                </div>
            </div>
            {
                classroom && <Modal
                    keepMounted={true}
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={className.modal}
                    open={open}
                    onClose={handleCloseEditClass}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={className.paper}>
                            <div className={className.heading}>
                                <h2>Chỉnh sửa {classroom.name}</h2>
                                <i className='bx bx-x' onClick={handleCloseEditClass}></i>
                            </div>
                            <EditClass open={open} classroom={classroom} />
                        </div>
                    </Fade>
                </Modal>
            }
        </div >
    )
}

export default ClassRoom
