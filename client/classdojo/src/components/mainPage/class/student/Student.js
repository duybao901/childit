import React, { useState } from 'react'

import { capitalizeTheFirstLetterOfEachWord } from '../../../../ultis/letter'
import FeedBackModal from '../feedbackmodal/FeedBackModal'

function Student({ student, classroom }) {

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
        <React.Fragment>
            <div className="classroom__student" onClick={handleOpenFeedBackModal}>
                <div className="classroom__student-img">
                    <img src={student.avatar} alt="allclass"></img>
                </div>
                <span
                    className={student.skillNumber === 0 ? "classroom__student-point" :
                        student.skillNumber > 0 ? "classroom__student-point have-point-pos" :
                            "classroom__student-point have-point-neg"}
                >
                    {student.skillNumber}
                </span>
                <p className="classroom__student-name">{capitalizeTheFirstLetterOfEachWord(student.name)}</p>
            </div>
            <FeedBackModal classroom={classroom} student={student} open={openFBM ? openFBM[`openFBM-${student._id}`] : false} handleClose={handleCloseFeedBackModal} />
        </React.Fragment>
    )
}

export default Student
