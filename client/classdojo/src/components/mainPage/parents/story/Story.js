import React, { useState, useEffect } from 'react'
import Header from '../../class/header/Header'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { capitalizeTheFirstLetterOfEachWord } from '../../../../ultis/letter'
import dayjs from 'dayjs'
function Story() {
    const { studentId } = useParams();
    const [student, setStudent] = useState();
    const auth = useSelector(state => state.auth);
    const { childs } = auth;
    useEffect(() => {
        if (studentId !== 'all') {
            childs.forEach(child => {
                if (child._id === studentId) {
                    child.parents.forEach(parent => {
                        if (child._id === parent.idStudents) {
                            child.className = parent.className;
                            child.dateJoin = parent.dateJoin;
                            child.teacher = parent.teacher;
                        }
                    })
                    setStudent(child);
                }
            })
        }
    }, [studentId, childs])
    console.log(student);
    return (
        <div>
            <Header />
            <div className='parent__header'>
                <i className='bx bxs-conversation'></i>
                Báo Cáo
            </div>
            <div className='parent'>
                <div className='parent_container'>
                    <div>
                        <ul className="parent__tab">
                            <Link to='/story/all'>
                                <li className={studentId === 'all' ? 'parent__tab-item active' : "parent__tab-item"}>
                                    <img src='https://home-static.classdojo.com/54fcc52956bb57d54679a0aa522e5e4f.png' alt="Home" />
                                    <p>Tất cả báo cáo</p>
                                </li>
                            </Link>
                            {childs && childs.map((student => {
                                return <Link key={student._id} to={`/story/${student._id}`}>
                                    <li className={studentId === student._id ? 'parent__tab-item active' : 'parent__tab-item'}>
                                        <img style={{ width: "50px", height: "60px" }} className='' src={student.avatar} alt="Home" />
                                        <p>{capitalizeTheFirstLetterOfEachWord(student.name)}</p>
                                    </li>
                                </Link>

                            }))}
                        </ul>
                        <div className='story__bubble'>
                            <img src="https://home-static.classdojo.com/219ddf8961e9a00997a576946851d7ea.svg" alt='a'></img>
                            <div>
                                <img src="https://res.cloudinary.com/dxnfxl89q/image/upload/v1622700390/Classdojo/ersuzgq7aw4ecn1hgetw.png" alt='b' style={{ width: "100px" }}></img>
                                <p>Tải lại trang để cập nhật dữ liệu mới nhất!</p>
                            </div>
                        </div>
                    </div>
                    <div className="parent__content">
                        <h2>{studentId === 'all' ? 'Tất cả' : student && student.name}</h2>
                        {studentId === 'all' ? '' : <div className="parent__content-infors">
                            <img style={{ width: "50px", height: "60px" }} alt='studentavatar' src={student && student.avatar}></img>
                            <div className='parent__content-infor'>
                                <p>Xem báo cáo của {student && capitalizeTheFirstLetterOfEachWord(student.name)} đến từ lớp {student && student.className} của {student && student.teacher}</p>
                                <span>{dayjs(student && student.dateJoin).format('dddd, DD MMM YYYY')}</span>
                            </div>
                        </div>}
                        {childs.forEach(child => {
                            child.skillArrayNotify.map((skill, index) => {
                                return <div key={`skill-${index}`} className="report__notify">
                                    <div className="report__notify-img">
                                        <img style={{ width: '40px' }} src={skill.avatar.url} alt='report__notify'>
                                        </img>
                                        <span className={skill.number < 0 ? "notify__nega" : ""}>{skill.number}</span>
                                    </div>
                                    <div className="report__notify-content">
                                        <p><span>{skill.number < 0 ? `${skill.number}` : `+${skill.number}`}</span> đến <span>{skill.to}</span> về <span>{skill.name}</span> </p>
                                        <p>{dayjs(skill.date).format('DD MMM, YYYY')} bởi {skill.by} đến {skill.to}</p>
                                    </div>
                                </div>
                            })
                        })}
                        <div className='parent__content-notify'>
                            {studentId === 'all' ? childs.map(child => {
                                return <React.Fragment key={child.code}>
                                    {
                                        child.skillArrayNotify.map((skill, index) => {
                                            return <div key={`skill-${index}`} className="report__notify">
                                                <div className="report__notify-img">
                                                    <img style={{ width: '40px' }} src={skill.avatar.url} alt='report__notify'>
                                                    </img>
                                                    <span className={skill.number < 0 ? "notify__nega" : ""}>{skill.number}</span>
                                                </div>
                                                <div className="report__notify-content">
                                                    <p><span>{skill.number < 0 ? `${skill.number}` : `+${skill.number}`}</span> đến <span>{skill.to}</span> về <span>{skill.name}</span> </p>
                                                    <p>{dayjs(skill.date).format('DD MMM, YYYY')} bởi {skill.by} đến {skill.to}</p>
                                                </div>
                                            </div>
                                        })}
                                </React.Fragment>
                            })
                                : <React.Fragment>
                                    {
                                        student && student.skillArrayNotify.length > 0 ? student.skillArrayNotify.map((skill, index) => {
                                            return <div key={`skill-${index}`} className="report__notify">
                                                <div className="report__notify-img">
                                                    <img style={{ width: '40px' }} src={skill.avatar.url} alt='report__notify'>
                                                    </img>
                                                    <span className={skill.number < 0 ? "notify__nega" : ""}>{skill.number}</span>
                                                </div>
                                                <div className="report__notify-content">
                                                    <p><span>{skill.number < 0 ? `${skill.number}` : `+${skill.number}`}</span> đến <span>{skill.to}</span> về <span>{skill.name}</span> </p>
                                                    <p>{dayjs(skill.date).format('DD MMM, YYYY')} bởi {skill.by} đến {skill.to}</p>
                                                </div>
                                            </div>
                                        }) : <div style={{ width: '100%', textAlign: 'center' }}>
                                            <img style={{ width: '250px' }} src='https://res.cloudinary.com/dxnfxl89q/image/upload/v1622274371/Classdojo/sharing_t1fe72.png' alt='no_skill'></img>
                                            <p style={{
                                                fontSize: '20px', fontWeight: "700",
                                                color: "#aab0d8"
                                            }}>{student && student.name} chưa được đánh giá điểm!</p>
                                        </div>}
                                </React.Fragment>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Story
