import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import styles from './styles'

import { capitalizeTheFirstLetterOfEachWord } from '../../../../ultis/letter'
import GroupFeedBackModal from '../groupfeedbackmodal/GroupFeedBackModal';
const useStyles = makeStyles(styles);
function StudentGroup({ student, classroom }) {
    const classes = useStyles();
    const [openFBM, setOpenFBM] = useState(false);

    const handleOpenFeedBackModal = () => {
        setOpenFBM({
            [`openFBM-${student._id}`]: true,
        });
    };

    const handleCloseFeedBackModal = () => {
        setOpenFBM({
            [`openFBM-${student._id}`]: false,
        });
    };
    return (
        <div>
            <div className={classes.studentListItem} onClick={handleOpenFeedBackModal}>
                <img style={{ width: '50px', height: '60px', marginLeft: '10px' }} src={student && student.avatar} alt='itemst'>
                </img>
                <p>{capitalizeTheFirstLetterOfEachWord(student.name)}</p>
                <div className={student.skillNumber >= 0 ? classes.skillNumber : classes.skillNumberNeg}>
                    <span>{student.skillNumber}</span>
                </div>
            </div>
            <GroupFeedBackModal classroom={classroom} student={student} open={openFBM ? openFBM[`openFBM-${student._id}`] : false} handleClose={handleCloseFeedBackModal} />
        </div>
    )
}

export default StudentGroup
