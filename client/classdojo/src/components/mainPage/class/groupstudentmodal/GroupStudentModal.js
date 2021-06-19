import React, { useState } from 'react'

import GroupModal from '../groupmodal/GroupModal'
import GroupFeedbackAll from '../groupfeedbackall/GroupFeedbackAll';
import StudentGroup from '../studentgroup/StudentGroup';


// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styles from './styles'

const useStyles = makeStyles(styles);
function GroupStudentModal({ open, handleClose, students, group, classroom }) {
    const classes = useStyles();
    const [openGroupModal, setOpenGroupModal] = useState(false);
    const [openFBM, setOpenFBM] = useState(false);
    const handleOpenGroupModal = () => {
        setOpenGroupModal({
            [`gr-open-${group._id}`]: true,
        });
    };

    const handleCloseGroupModal = () => {
        setOpenGroupModal({
            [`gr-open-${group._id}`]: false,
        });
    };


    const handleOpenFeedBackModal = () => {
        setOpenFBM({
            [`openFBM-${group._id}`]: true,
        });
    };

    const handleCloseFeedBackModal = () => {
        setOpenFBM({
            [`openFBM-${group._id}`]: false,
        });
    };


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
                // keepMounted={true}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <div className={classes.heading}>
                            <div onClick={handleOpenGroupModal}>
                                <i className='bx bxs-cog' ></i>
                                {/* <i className='bx bxs-down-arrow' style={{ fontSize: '10px', color: "rgb(0, 178, 247)" }}></i> */}
                            </div>
                            <GroupModal
                                open={openGroupModal ? openGroupModal[`gr-open-${group._id}`] : false}
                                handleClose={handleCloseGroupModal}
                                onEdit={true}
                                students={students}
                                classroom={classroom}
                                group={group}
                            />
                            <h2>{group.groupName}</h2>
                            <i className='bx bx-x' onClick={handleClose}></i>
                        </div>
                        <div className={classes.studentsp}>
                            <div className={classes.studentList}>
                                {
                                    students.map(student => {
                                        return <StudentGroup key={student._id} student={student} classroom={classroom} />
                                    })
                                }
                            </div>
                        </div>
                        <div className={classes.addward}>
                            <div onClick={handleOpenFeedBackModal}>
                                Cả nhóm
                            </div>
                        </div>
                        <GroupFeedbackAll students={students} handleClose={handleCloseFeedBackModal} group={group} open={openFBM ? openFBM[`openFBM-${group._id}`] : false} classroom={classroom} />
                    </div>
                </Fade>
            </Modal>
        </div >
    )
}

export default GroupStudentModal
