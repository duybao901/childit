import React from 'react'
import { Link } from 'react-router-dom';
import EditClass from '../editclass/EditClass'

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styles from './styles';


import { capitalize } from '../../../../ultis/letter'


const useStyles = makeStyles(styles);
function ClassesGrade({ classroom }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <React.Fragment>
            <div className='classgrade'>
                <i className='bx bxs-cog classgrade__setting' onClick={handleOpen}></i>
                <Link to={`classroom/${classroom._id}/points`} className="classgrade__box">
                    <img src={classroom.avatar} alt="new class" />
                    <p className="classgrade__name">{capitalize(classroom.name)}</p>
                    <p className="classgrade__infor">{classroom.students.length} Học sinh</p>
                </Link>
            </div>
            <Modal
                keepMounted={true}
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
                            <h2>Chỉnh sửa {classroom.name}</h2>
                            <i className='bx bx-x' onClick={handleClose}></i>
                        </div>
                        <EditClass open={open} classroom={classroom}/>
                    </div>
                </Fade>
            </Modal>
        </React.Fragment>

    )
}

export default ClassesGrade
