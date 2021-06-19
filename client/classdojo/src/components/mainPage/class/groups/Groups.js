import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import GroupItem from '../groupitem/GroupItem'
import GroupModal from '../groupmodal/GroupModal'
function Groups({ classroom }) {
    const [openGroupModal, setOpenGroupModal] = useState(false);
    const { groups } = useSelector(state => state.groups);

    const handleOpenGroupModal = () => {
        setOpenGroupModal({
            [`gr-open-${classroom._id}`]: true,
        });
    };

    const handleCloseGroupModal = () => {
        setOpenGroupModal({
            [`gr-open-${classroom._id}`]: false,
        });
    };
    return (
        <div className="groups">
            <div className='groups__container'>
                <div className="groups__row">
                    {groups ? groups.map((group, index) => {
                        return <GroupItem classroom={classroom} group={group} key={index} />
                    }) : ""}
                    <div className="groups__item" onClick={() => handleOpenGroupModal(classroom._id)}>
                        <img style={{ width: "50px", marginTop: '30px', objectFit: "cover", marginBottom: '10px' }} src="https://teach-static.classdojo.com/0e34831b8da61499a5a01525b79183de.png" alt='add-gr'></img>
                        <div>
                            <p className="groups__item-add-p">Thêm nhóm</p>
                        </div>
                    </div>
                    <GroupModal
                        classroom={classroom}
                        open={openGroupModal ? openGroupModal[`gr-open-${classroom._id}`] : false}
                        handleClose={handleCloseGroupModal}
                        onEdit={false}
                        onAdd={true}
                    />
                </div>
            </div>
        </div>
    )
}

export default Groups
