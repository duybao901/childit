import React from 'react'
import { useSelector } from 'react-redux'
function School() {

    const { user } = useSelector(state => state.auth);

    return (
        <div className='school'>
            <div className='school__wrapper'>
                <div className='school__user'>
                    <div className='school__user-infor'>
                        <p className='school__user-infor-name'>{user.name}</p>
                        <span>Giáo viên tại trường...</span>
                    </div>
                    <div className='school__user-img'>
                        <img width="60px" src={user.avatar && user.avatar.url} alt='useravatar'>
                        </img>
                    </div>
                </div>
                <div className="school__box">
                    <div className="school__infor">
                        <img src="https://teach-static.classdojo.com/e89e45ff400afbee200201bda791e476.png" width="60px" alt='schollavatar'></img>
                        <p>...</p>
                    </div>
                    <div className="school__control">
                        <p>Bạn đang dạy tại trường... Bạn có thể thay đổi trường học bằng cách nhấn vào nút bên dưới</p>
                        <div style={{ textAlign: 'center', width: "100%" }}>
                            <button className="school__control-button">
                                Thay đổi trường học
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default School
