import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import teacherBadge from '../../../assets/img/teacher_badge.png'
import parentBadge from '../../../assets/img/parent_badge.png'
import headerVideo from '../../../assets/img/header_video.mp4';
import teacherStudentSvg from '../../../assets/img/teacher-and-students-e315462616251a3846269213eaafc48e.svg'
import positiveCulture from '../../../assets/img/positive_culture.png'
import shareMoment from '../../../assets/img/share_moments.png'
import sharing from '../../../assets/img/sharing.png'
import balloonLeft from '../../../assets/img/balloons-left@2x.png'
import balloonRight from '../../../assets/img/balloons-right@2x.png'
import welcomeClassdojoPdf from '../../../assets/img/WelcometoClassDojo.pdf'
import loginForParent from '../../../assets/img/login_for_parents.png'
import studentPost from '../../../assets/img/student_post.png'



// Material UI 
import styles from './styles';
const useStyles = makeStyles(styles);

function Body() {
    const classes = useStyles();
    return (
        <Fragment>
            <div className="main__content">
                <div className="main__content-page1">
                    <div className="page1__role">
                        <h1>Kết nối gia đình với lớp học</h1>
                        <p>Cung cấp nền tảng giúp kết nối phụ huynh và giáo viên.
                        Tạo môi trường lớp học thân thiện, sinh động! Hoàn toàn miễn phí.</p>
                        <h3>Đăng ký với tư cách là...</h3>
                        <div className={classes.group}>
                            <Link to='/register/teacher' className={classes.headerButton} id="teacher"><img alt="teacher badge" src={teacherBadge} />Giáo viên</Link>
                            <Link to='/register/parent' className={classes.headerButton} id="parent"><img alt="parent badge" src={parentBadge} />Phụ huynh</Link>
                        </div>
                    </div>
                    <div className="page1__videoHeader">
                        <video width="100%" height="50%" autoPlay loop src={headerVideo}></video>
                        <img alt="Teacher and student" src={teacherStudentSvg} />
                    </div>
                </div>
                <div id="learnmore" className="main__content-learnMore">
                    <div className="learnMore__boxContent">
                        <h4>Trang web giúp kết nối các giáo viên và các bậc phụ huynh để xây dựng một lớp học thú vị</h4>
                        <div className="learnMore__boxContent-boxDetails">
                            <div className="boxDetails__details">
                                <img src={positiveCulture} alt="culture" />
                                <h4>Tạo nên một văn hóa tích cực</h4>
                                <p>Giáo viên có thể khuyến khích học sinh khi các em làm việc chăm chỉ,
                                hành xử tốt, giúp đỡ mọi người hay bất cứ điều tích cực khác</p>
                            </div>
                            <div className="boxDetails__details">
                                <img src={shareMoment} alt="moments" />
                                <h4>Chia sẽ khoảnh khắc với phụ huynh</h4>
                                <p>Phụ huynh có thể xem các khoảnh khắc tuyệt vời của con mình trong lớp học</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main__content-resources">
                    <h1>Cùng nhau tạo nên một năm học thật tuyệt vời</h1>
                    <h2>Tạo nên môi trường lớp học của riêng bạn bất cứ ở đâu</h2>

                    <div className="resources__teacher">
                        <h3 className="topicName">Tài nguyên dành cho giáo viên</h3>
                        <div className="resources__teacher-sharing">
                            <img src={sharing} alt="sharingimg" />
                            <div className="sharing__content">
                                <h4>Chia sẻ với giáo viên? Đây là những gì bạn cần</h4>
                                <p>Bản trình bày dưới đây giúp bạn tìm hiểu cách sử dụng trang
                                web của chúng tôi dưới vai trò là một giáo viên. Giúp bạn và đồng nghiệp dễ dàng tiếp cận với trang web của chúng tôi.</p>
                                <a href={welcomeClassdojoPdf} download>Tải xuống</a>
                            </div>
                        </div>
                        <div className="resources__teacher-decorationBox">
                            <img className="decorationLeft" src={balloonLeft} alt="balloons-left" />
                            <img className="decorationRight" src={balloonRight} alt="balloons-right" />
                            <div className="decorationBox__content">
                                <h3>Decoration Pack!</h3>
                                <p>Gói trang trí miễn phí gồm các hình ảnh quái vật dễ thương,
                                áp phích và giấy chứng nhận</p>
                                <Link to='' >Tải xuống Decoration Pack</Link>
                            </div>
                        </div>
                    </div>
                    <div className="resources__parent">
                        <h3 className="topicName">Tài nguyên dành cho phụ huynh</h3>
                        <div className="resources__parent-Box">
                            <img src={loginForParent} alt="handclap" />
                            <h3>Làm thế nào để phụ huynh đăng nhập</h3>
                            <p>Một video hướng dẫn nhanh giúp phụ huynh hiểu cách sử dụng trang web</p>
                            <a href="https://www.youtube.com/watch?v=gjS1U8wiH7A">Xem video</a>
                        </div>
                        <div className="resources__parent-Box parent-boxRight">
                            <img src={studentPost} alt="post" />
                            <h3>Làm thế nào để học sinh đăng khoảnh khắc</h3>
                            <p>Một video hướng dẫn nhanh giúp học sinh biết cách sử dụng chức năng xem hoạt động, phản hồi và tạo bài đăng</p>
                            <a href="https://www.youtube.com/watch?v=vnfJDONJvCY">Xem video</a>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
        
    )
}

export default Body
