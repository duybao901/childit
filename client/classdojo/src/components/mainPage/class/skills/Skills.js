import React, { useState, useEffect } from 'react'

import SkillModal from '../skillmodal/SkillModal';
import { capitalize } from '../../../../ultis/letter'
function Skills({ open, classroom }) {
    const [openSkillModal, setOpenSkillModal] = useState(false);
    const [openAddSkillModal, setOpenAddSkillModal] = useState(false);
    const [isPos, setIsPos] = useState(true);


    const handleOpenSkillModalEdit = (skillId, isPos) => {
        setIsPos({
            isPos
        })
        setOpenSkillModal({
            [`openSkill-${skillId}`]: true,
        });
    };

    const handleCloseSkillModal = (skillId) => {
        setOpenSkillModal({
            [`openSkill-${skillId}`]: false,
        });
    };

    function handleOpenAddSkillModal(isPos) {
        setIsPos({
            isPos
        })
        setOpenAddSkillModal(true);
    }

    function handleCloseAddSkillModal() {
        setIsPos({
            isPos
        })
        setOpenAddSkillModal(false);
    }

    function openTab(e, tab) {
        const tabList = document.querySelectorAll(`ul.skills__tab-list-${classroom._id} li`);
        const tabListLength = tabList.length;
        const tabContent = document.querySelectorAll(`.skills__content-${classroom._id}`);
        const tabContentLength = tabContent.length;
        for (let i = 0; i < tabListLength; i++) {
            tabList[i].classList.remove('active');
        }
        for (let i = 0; i < tabContentLength; i++) {
            tabContent[i].classList.remove('active');
        }
        e.target.classList.add('active')
        document.getElementById(tab).classList.add('active');
    }

    useEffect(() => {
        if (document.getElementById(`skill-df-opens-${classroom._id}`)) {
            document.getElementById(`skill-df-opens-${classroom._id}`).click();
        }
    }, [open, classroom])
    return (
        <div className='skills'>
            <div className="skills__tab-list">
                <ul className={`skills__tab-list-${classroom._id}`}>
                    <li onClick={(e) => openTab(e, `pos-${classroom._id}-skills`)} id={`skill-df-opens-${classroom._id}`}>
                        Tích cực
                    </li>
                    <li onClick={(e) => openTab(e, `neg-${classroom._id}-skills`)}>
                        Tiêu cực
                    </li>
                </ul>
            </div>
            <div className={`skills__content skills__content-${classroom._id}`} id={`pos-${classroom._id}-skills`}>
                <div className='skills__content-list'>
                    {classroom.skills && classroom.skills.map((skill, index) => {
                        if (parseInt(skill.number) > 0) {
                            return <div key={index} className='skills__content-list-item'>
                                <div className='skill__item-infor'>
                                    <div className="skill__item-infor-img">
                                        <img src={skill.avatar.url} alt='skillavatar'></img>
                                    </div>
                                    <p>{capitalize(skill.name)}</p>
                                    <span className="skill__item-infor-point">{skill.number}</span>
                                </div>
                                <div className='skill__item-edit' onClick={() => handleOpenSkillModalEdit(skill._id, true)}>
                                    <div className="skill__item-infor-edit">
                                        <i className='bx bx-pencil'></i>
                                    </div>
                                    <p>Chỉnh sửa</p>
                                </div>
                                <SkillModal isPos={isPos} classroom={classroom} skill={skill} open={openSkillModal ? openSkillModal[`openSkill-${skill._id}`] ? openSkillModal[`openSkill-${skill._id}`] : false : false} handleClose={handleCloseSkillModal} />
                            </div>
                        } else {
                            return '';
                        }
                    })}
                    <div className='skills__content-list-item skills__content-list-item-add' onClick={() => handleOpenAddSkillModal(true)}>
                        <div className='skill__item-infor'>
                            <div className="skill__item-infor-edit">
                                <i className='bx bx-plus' ></i>
                            </div>
                            <p>Thêm kỹ năng</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`skills__content skills__content-${classroom._id}`} id={`neg-${classroom._id}-skills`}>
                <div className='skills__content-list'>
                    {classroom.skills && classroom.skills.map((skill, index) => {
                        if (parseInt(skill.number) < 0) {
                            return <div key={index} className='skills__content-list-item'>
                                <div className='skill__item-infor'>
                                    <div className="skill__item-infor-img">
                                        <img src={skill.avatar.url} alt='skillavatar'></img>
                                    </div>
                                    <p>{capitalize(skill.name)}</p>
                                    <span className="skill__item-infor-point skill__item-infor-point-nega">{skill.number}</span>
                                </div>
                                <div className='skill__item-edit' onClick={() => handleOpenSkillModalEdit(skill._id, false)}>
                                    <div className="skill__item-infor-edit">
                                        <i className='bx bx-pencil'></i>
                                    </div>
                                    <p>Chỉnh sửa</p>
                                </div>
                                <SkillModal isPos={isPos} classroom={classroom} skill={skill} open={openSkillModal ? openSkillModal[`openSkill-${skill._id}`] ? openSkillModal[`openSkill-${skill._id}`] : false : false} handleClose={handleCloseSkillModal} />
                            </div>
                        } else {
                            return '';
                        }
                    })}
                    <div className='skills__content-list-item skills__content-list-item-add' onClick={() => handleOpenAddSkillModal(false)}>
                        <div className='skill__item-infor'>
                            <div className="skill__item-infor-edit">
                                <i className='bx bx-plus' ></i>
                            </div>
                            <p>Thêm kỹ năng</p>
                        </div>
                    </div>
                </div>
            </div>
            <SkillModal isPos={isPos} classroom={classroom} open={openAddSkillModal} handleClose={handleCloseAddSkillModal} />
        </div >
    )
}

export default Skills
