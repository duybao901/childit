import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import * as classAction from '../../../../redux/actions/classAction';

import { ShowToastifySuccess } from '../../../../ultis/notify';
import classImages from '../../../../ultis/classImage';
import { capitalizeTheFirstLetterOfEachWord } from '../../../../ultis/letter'

import AddStudentModal from '../addstudentmodal/AddStudentModal';
import EditStudentModal from '../editstudentmodal/EditStudentModal'
import Skills from '../skills/Skills'

function EditClass({ open, classroom }) {

    const disPatch = useDispatch();
    const [classIfor, setClassInfor] = useState({ className: classroom.name, gradeId: classroom.gradeId, classId: classroom._id });
    const { className, gradeId } = classIfor;
    const { grades } = useSelector(state => state.grade);
    const { token } = useSelector(state => state.token);
    const [editClassLoading, setEditClassLoading] = useState(false);
    const [openDropDownAvatar, setOpenDropDownAvatar] = useState(false);
    const [openModalAddStudent, setOpenModalAddStudent] = useState(false);
    const [openModalEditStudent, setOpenModalEditStudent] = useState(false);

    const handleOpenModalAddStudent = () => {
        setOpenModalAddStudent(true);
    };

    const handleCloseModalAddStudent = () => {
        setOpenModalAddStudent(false);
    };

    const handleOpenModalEditStudent = (idOpen) => {
        setOpenModalEditStudent({
            [`setOpen-${idOpen}`]: true,
        })
    };

    const handleCloseModalEditStudent = (idOpen) => {
        setOpenModalEditStudent({
            [`setOpen-${idOpen}`]: false,
        })
    };

    function openTab(e, tabName) {
        const tabList = document.querySelectorAll('.editclass__menu-item');
        const tabListLength = tabList.length;
        const tabContent = document.querySelectorAll('.editclass__content');
        const tabContentLength = tabContent.length;

        for (let i = 0; i < tabListLength; i++) {
            tabList[i].classList.remove("active")
        }

        for (let i = 0; i < tabContentLength; i++) {
            tabContent[i].classList.remove('active');
        }

        document.getElementById(tabName).classList.add('active');
        e.target.classList.add('active');
    }

    useEffect(() => {
        if (open) {
            if (document.getElementById(`default-open${classroom._id}`)) {
                document.getElementById(`default-open${classroom._id}`).click();
            }
        }
    }, [open, classroom._id])

    const onHandleSubmitClassInfor = async (e) => {
        e.preventDefault();
        setEditClassLoading(true);
        await axios.patch(`/class/${classroom._id}`, {
            name: classIfor.className,
            gradeId: classIfor.gradeId,
        }, {
            headers: {
                Authorization: token
            }
        })
        setEditClassLoading(false);
        ShowToastifySuccess("??????????? Ch???nh s???a th??nh c??ng")
        disPatch(classAction.editClass(classIfor));
    }

    function onHandleChangeClassInfor(e) {
        setClassInfor({
            ...classIfor,
            [e.target.name]: e.target.value
        })
    }

    function openDropDown() {
        setOpenDropDownAvatar(!openDropDownAvatar);
    }

    function closeDropDown() {
        setOpenDropDownAvatar(false);
    }

    const changeClassAvatar = async (classImage) => {
        const avatar = classImage.target.src;
        disPatch(classAction.editClassAvatar(avatar, classroom._id));
        setOpenDropDownAvatar(false);
        ShowToastifySuccess('??????????? Ch???nh s???a th??nh c??ng');
        await axios.patch(`/class/change_avatar/${classroom._id}`, {
            avatar
        }, {
            headers: {
                Authorization: token
            }
        });
    }

    return (
        <div className='editclass'>
            <ul className='editclass__menu'>
                <li className='editclass__menu-item' onClick={(e) => openTab(e, 'infor' + classroom._id)} id={`default-open${classroom._id}`}>
                    Th??ng tin
                </li>
                <li className='editclass__menu-item' onClick={(e) => openTab(e, 'students' + classroom._id)}>
                    H???c sinh
                </li>
                {/* <li className='editclass__menu-item' onClick={(e) => openTab(e, 'families' + classroom._id)}>
                    Gia ????nh
                </li> */}
                <li className='editclass__menu-item' onClick={(e) => openTab(e, 'skills' + classroom._id)}>
                    K??? n??ng
                </li>
            </ul>
            <div className="editclass__content" id={`infor${classroom._id}`}>
                <div className="editclass__infor-img">
                    <div className='editclass__dropdown'>
                        <div onClick={openDropDown} className="editclass__dropdown-button editclass__img">
                            <img src={classroom.avatar} alt='classavatar'></img>
                            <i className='bx bx-caret-down'></i>
                        </div>
                        <div className={openDropDownAvatar ? "editclass__dropdown-content active" : "editclass__dropdown-content"}>
                            <i className='bx bx-x' onClick={closeDropDown}></i>
                            {classImages.map((classImage, index) => {
                                return (<div key={index} className="editclass__dropdown-content-item" onClick={(classImage) => changeClassAvatar(classImage)}>
                                    <img src={classImage.url} alt='classavatarselect'></img>
                                </div>)
                            })}
                        </div>
                    </div>
                </div>
                <form className="editclass__infor-form" onSubmit={onHandleSubmitClassInfor}>
                    <div className="editclass__infor-form-gr">
                        <label htmlFor="nameClass">T??n l???p</label>
                        <input required value={className} onChange={onHandleChangeClassInfor} type='text' name='className'></input>
                    </div>
                    <div className="editclass__infor-form-gr">
                        <label htmlFor="grade">L???p</label>
                        <select value={gradeId} onChange={onHandleChangeClassInfor} name='gradeId' required>
                            <option value="">Ch???n l???p h???c</option>
                            {grades && grades.map((grade) => {
                                return <option key={grade._id} value={grade._id}>
                                    {grade.gradeName}
                                </option>
                            })}
                        </select>
                    </div>
                    <div className="editclass__infor-form-button">
                        <button disabled={editClassLoading} className={editClassLoading ? 'ds' : ''}>L??u thay ?????i</button>
                    </div>
                </form>
            </div>
            <div className="editclass__content" id={`students${classroom._id}`}>
                <div className="editclass__content-addst" onClick={handleOpenModalAddStudent}>
                    <i className='bx bx-plus'></i>
                    <span>Th??m h???c sinh</span>
                </div>
                <AddStudentModal open={openModalAddStudent} handleOpen={handleOpenModalAddStudent} handleClose={handleCloseModalAddStudent} classroom={classroom} />
                <ul className="editclass__content-listst">
                    {classroom.students.length === 0 ? (<li>??????????? L???p h???c ch??a c?? h???c sinh</li>) : (
                        classroom.students.map((student, index) => {
                            var idOpen = student._id;
                            return (<React.Fragment key={index} >
                                <li onClick={() => handleOpenModalEditStudent(idOpen)}>
                                    <img src={student.avatar} alt="studentavatar"></img>
                                    <span>{capitalizeTheFirstLetterOfEachWord(student.name)}</span>
                                </li>
                                <EditStudentModal classroom={classroom} student={student} idOpen={idOpen} open={openModalEditStudent ? openModalEditStudent[`setOpen-${idOpen}`] : false} handleClose={() => handleCloseModalEditStudent(idOpen)} />
                            </React.Fragment>)
                        })
                    )}
                </ul>
            </div>
            {/* <div className="editclass__content" id={`families${classroom._id}`}>
                families
            </div> */}
            <div className="editclass__content" id={`skills${classroom._id}`}>
                <Skills open={open} classroom={classroom} />
            </div>
        </div >
    )
}

export default EditClass
