import React, { useState, useEffect } from 'react'

import GroupStudentModal from '../groupstudentmodal/GroupStudentModal'

function Groups({ classroom, group }) {
    const [students, setStudents] = useState([]);
    const [openGroupStudentModal, setOpenGroupStudentModa] = useState(false);

    useEffect(() => {
        const newStudents = [];
        group.students.forEach(student_g => {
            classroom.students.forEach(student => {
                if (student._id === student_g) {
                    newStudents.push(student);
                }
            })
        })
        setStudents(newStudents);
    }, [group, classroom.students])

    const handleOpenGroupStudentModal = () => {
        setOpenGroupStudentModa({
            [`gr-open-${group._id}`]: true,
        });
    };

    const handleCloseGroupStudentModal = () => {
        setOpenGroupStudentModa({
            [`gr-open-${group._id}`]: false,
        });
    };
    return (
        <React.Fragment>
            <div className="groups__item" onClick={handleOpenGroupStudentModal}>
                <div className="groups__item-wrap-img">
                    {students && students.map(((student, index) => {
                        if (index < 4) {
                            return <div key={index} className="groups__item-img">
                                <img alt="st-avatar" style={{ width: '50px' }} src={student.avatar}></img>
                            </div>
                        } else {
                            return "";
                        }
                    }))}
                </div>
                <div>
                    <p className='groups__item-name'>{group && group.groupName}</p>
                </div>
            </div>
            <GroupStudentModal
                classroom={classroom}
                open={openGroupStudentModal ? openGroupStudentModal[`gr-open-${group._id}`] : false}
                handleClose={handleCloseGroupStudentModal}
                onEdit={false}
                onPlus={true}
                students={students}
                group={group}
            />
        </React.Fragment>
    )
}

export default Groups