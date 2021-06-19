import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import dayjs from 'dayjs'
// import { PieChart } from 'react-minimal-pie-chart';

import Header from '../header/Header'

import { capitalizeTheFirstLetterOfEachWord } from '../../../../ultis/letter'

function Report() {
    const [classroom, setClassroom] = useState("");
    const [student, setStudent] = useState("");
    // const [skillNumber, setSkillNumber] = useState('');
    const params = useParams();
    const { id, studentid } = params;
    // const [data, setData] = useState(false);
    const { classes } = useSelector(state => state.classes);
    useEffect(() => {
        if (id) {
            // if (studentid === 'all') {
            //     const data = [
            //         { title: 'One', value: 10, color: '#E38627' },
            //         { title: 'Two', value: 15, color: '#C13C37' },
            //     ];
            //     setData(data);
            // } else {
            //     setData([]);
            // }
            classes.forEach((classroom) => {
                if (classroom._id === id) {
                    classroom.skillArrayNotify.sort(function (a, b) {
                        return new Date(b.date) - new Date(a.date);
                    });
                    classroom.students.forEach(student => {
                        if (studentid !== 'all') {
                            if (student._id === studentid) {
                                student.skillArrayNotify.sort(function (a, b) {
                                    return new Date(b.date) - new Date(a.date);
                                });
                                setStudent(student);
                            }
                        }
                    })
                    setClassroom(classroom);
                }
            })
        }
    }, [id, classes, studentid])
    return (
        <div>
            <Header id={id} />
            <div className='report'>
                <div className="report__container">
                    <div className="report__body">
                        <h2 className="report__header">Báo cáo</h2>
                        <div className="report__tab">
                            <div className="report__tab-list">
                                <div className="report__tab-list-label">Học sinh</div>
                                <Link to={`/classroom/${id}/dashboard/reports/all`}
                                    className={studentid === 'all' ? 'report__tab-list-item active' : 'report__tab-list-item '}>
                                    <img style={{ width: '25px' }} src="https://teach-static.classdojo.com/fe38ededce00321c6840ba1271c1fc2f.png" alt="allclass"></img>
                                    <p>{capitalizeTheFirstLetterOfEachWord('Cả lớp')}</p>
                                </Link>
                                {classroom && classroom.students.map((student) => {
                                    return <Link to={`/classroom/${id}/dashboard/reports/${student._id}`} key={student._id}
                                        className={studentid === student._id ? 'report__tab-list-item active' : 'report__tab-list-item '}>
                                        <img src={student.avatar} style={{ width: '25px' }} alt='studentavatar'></img>
                                        <p>{capitalizeTheFirstLetterOfEachWord(student.name)}</p>
                                    </Link>
                                })}
                            </div>
                            <div className="report__tab-content">
                                {studentid === 'all' ? <div className="report__tab-content-header">
                                    <img style={{ width: '40px' }} src="https://teach-static.classdojo.com/fe38ededce00321c6840ba1271c1fc2f.png" alt="allclass"></img>
                                    <p>{capitalizeTheFirstLetterOfEachWord('Cả lớp')}</p>
                                </div> : <div className="report__tab-content-header">
                                    <img alt='studentavatar' style={{ width: '40px' }} src={student ? student.avatar : ''}></img>
                                    <p>{student && capitalizeTheFirstLetterOfEachWord(student.name)}</p>
                                </div>}

                                <div className="report__tab-content-chart-wrapper">
                                    {/* <div className="report__tab-content-body">
                                        <div className="report__tab-content-p">
                                            <p>
                                                Tích cực: 5
                                            </p>
                                            <p>
                                                Tiêu cực: 2
                                            </p>
                                        </div>
                                        <div className="report__tab-content-chart">
                                            {data && <PieChart
                                                data={data}
                                                lineWidth={55}
                                                label={({ dataEntry }) => dataEntry.value}
                                                labelStyle={(index) => ({
                                                    fontSize: '5px',
                                                    fontFamily: 'sans-serif',
                                                })}
                                                animate
                                                paddingAngle={1}
                                            />}
                                        </div>
                                    </div> */}
                                    {studentid !== 'all' ?
                                        student.skillArrayNotify && student.skillArrayNotify.length ? student.skillArrayNotify.map((skill, index) => {
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
                                            }}>Hãy đánh giá điểm cho học sinh của bạn!</p>
                                        </div> : classroom.skillArrayNotify && classroom.skillArrayNotify.length ? classroom.skillArrayNotify.map((skill, index) => {
                                            return <div key={`skill-${index}`} className="report__notify">
                                                <div className="report__notify-img">
                                                    <img style={{ width: '40px' }} src={skill.avatar.url} alt='report__notify'>
                                                    </img>
                                                    <span className={skill.number < 0 ? "notify__nega" : ""}>{skill.number}</span>
                                                </div>
                                                <div className="report__notify-content">
                                                    <p><span>{skill.number < 0 ? `${skill.number}` : `+${skill.number}`}</span> đến <span>{skill.to}</span> về <span>{skill.name}</span> </p>
                                                    <p>{dayjs(skill.date).format('DD MMM, YYYY')}  bởi {skill.by} đến {skill.to}</p>
                                                </div>
                                            </div>
                                        }) : <div style={{ width: '100%', textAlign: 'center' }}>
                                            <img style={{ width: '250px' }} src='https://res.cloudinary.com/dxnfxl89q/image/upload/v1622274371/Classdojo/sharing_t1fe72.png' alt='no_skill'></img>
                                            <p style={{
                                                fontSize: '20px', fontWeight: "700",
                                                color: "#aab0d8"
                                            }}>Hãy đánh giá điểm cho lớp!</p>
                                        </div>
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='report__box'>
                    <img style={{ width: '150px' }} src='https://teach-static.classdojo.com/124179bbb6d19e989669d2def33071a4.png' alt='report-box'></img>
                    <p className='report__box-p'>Chú ý 👋</p>
                    <p className='report__box-p-1'>Nếu thông báo chưa cập nhật</p>
                    <p className='report__box-p-2'>Hãy làm mới lại trang</p>
                </div>
            </div>
        </div >
    )
}

export default Report
