import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

import Header from '../../../header/Header'
import { ShowErrorMessage, ShowSuccessMessage } from '../../../../ultis/notify'
import { isEmpty, isLength } from '../../../../ultis/validations'
const state = {
    password: '',
    err: '',
    success: '',
    loading: false,
}
function ResetPassword() {
    const { token } = useParams();
    const [newpassword, setNewpassword] = useState(state);
    const { password, err, success, loading } = newpassword;

    function onHandleChange(e) {
        setNewpassword({
            ...newpassword,
            [e.target.name]: e.target.value,
            err: '',
            success: '',
            loading: false,
        })
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        if (isEmpty(password)) {
            return setNewpassword({
                ...newpassword,
                err: 'Mật khẩu mới không được trống',
                success: '',
                loading: false,
            })
        }
        if (isLength(password)) {
            return setNewpassword({
                ...newpassword,
                err: 'Mật khẩu tối thiểu 8 ký tự',
                success: '',
                loading: false,
            })
        }
        try {
            setNewpassword({
                ...newpassword,
                err: '',
                success: '',
                loading: true,
            })
            const res = await axios.post('/user/reset_password', {
                password
            }, {
                headers: { Authorization: token }
            });
            setNewpassword({
                ...newpassword,
                err: '',
                success: res.data.msg,
                loading: false,
            })
            console.log(res)
        } catch (err) {
            console.log(err.response)
            if (err) throw err;
        }
    }

    return (
        <React.Fragment>
            <Header />
            <div className='resetpw'>
                <div className='reset__box'>
                    <h2 className="resetpw__header">
                        Thay đổi mật khẩu của bạn
                    </h2>
                    <p className="resetpw__detail">
                        Nếu bạn đã biết mật khẩu của mình, bạn có thể đăng nhập tại
                    </p>
                    <Link to='' className="resetpw__link">https://www.childitvn.com</Link>
                    {err ? ShowErrorMessage(err) : ''}
                    {success ? ShowSuccessMessage(success) : ''}
                    {loading ? (<div className='resetpw__loading' ><img className='resetpw__loading-img' src="https://res.cloudinary.com/dxnfxl89q/image/upload/v1622274370/Classdojo/loading_umu1sx.gif" alt='forgot-loading'></img></div>) : ''}
                    <form>
                        <input type='password' name='password' onChange={onHandleChange} value={password} className="resetpw__input" new-password='true' autoComplete='true' ></input>
                    </form>
                    <button onClick={onHandleSubmit} className="resetpw__button">Thay đổi mật khẩu</button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ResetPassword
