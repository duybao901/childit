import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import registerLogoImage from '../../../../assets/img/logo.svg'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { isEmail, isEmpty, isLength, isMatch } from '../../../../ultis/validations';
import { ShowSuccessMessage, ShowErrorMessage } from '../../../../ultis/notify';
const state = {
    name: '',
    email: '',
    password: '',
    cf_password: '',
    phone: '',
    address: '',
    err: '',
    success: '',
    loading: false,
}

function Register() {
    let { role } = useParams();
    const [user, setUser] = useState(state);
    const { name, email, password, cf_password, phone, address, err, success, loading } = user;
    const onHandleSubmit = async (e) => {
        e.preventDefault();
        if (isEmpty(name) || isEmpty(email) || isEmpty(password)
            || isEmpty(cf_password) || isEmpty(phone) || isEmpty(address)) {
            return setUser({
                ...user,
                err: "hãy điền hết các thông tin",
                success: "",
            })
        }
        if (!isEmail(email)) {
            return setUser({
                ...user,
                err: "Email không hợp lệ", success: ''
            })
        }
        if (isLength(password)) {
            return setUser({
                ...user,
                err: "Mật khẩu phải có 8 ký tự", success: ''
            })
        }
        if (!isMatch(password, cf_password)) {
            return setUser({
                ...user,
                err: "Mật khẩu không trùng khớp", success: ''
            })
        }
        try {
            setUser({
                ...user,
                loading: true,
            })
            const res = await axios.post('/user/register', {
                name, email, password, confirmPassword: cf_password, phone,
                address,
                role: role === 'teacher' ? 1 : 2,
            })
            setUser({
                ...user,
                success: res.data.msg,
                loading: false,
            })
        } catch (err) {
            if (err) {
                setUser({
                    ...user,
                    err: err.response.data.msg, success: ''
                })
            }
        }
    }
    const onHandleChange = async (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
            err: '',
            success: '',
        })
    }
    return (
        <div className='register'>
            <div className="register__header">
                <Link to='/'>
                    <img alt="logo-regiser" src={registerLogoImage}></img>
                </Link>
            </div>
            <h2 className="register__title">{(role === 'parent') ? 'Đăng ký với tư cách là phụ huynh' : 'Đăng ký với tư cách là giáo viên'}</h2>
            {err ? ShowErrorMessage(err) : ''}
            {success ? ShowSuccessMessage(success) : ''}
            {loading ? (<div className='login__loading' ><img className='login__loading-img' src="https://res.cloudinary.com/dxnfxl89q/image/upload/v1622274370/Classdojo/loading_umu1sx.gif" alt='forgot-loading'></img></div>) : ''}
            <div className='register__form'>
                <form onSubmit={onHandleSubmit}>
                    <div className='register__form-group'>
                        <input onChange={onHandleChange} type='text' name='name' placeholder="Họ và tên" defaultValue={name}></input>
                    </div>
                    <div className='register__form-group'>
                        <input onChange={onHandleChange} type='email' name='email' placeholder="Email" defaultValue={email}></input>
                    </div>
                    <div className='register__form-group'>
                        <input onChange={onHandleChange} type='password' name='password' placeholder="Mật khẩu" defaultValue={password} autoComplete='true'></input>
                    </div>
                    <div className='register__form-group'>
                        <input onChange={onHandleChange} type='password' name='cf_password' placeholder="Nhập lại mật khẩu" defaultValue={cf_password} autoComplete='true' ></input>
                    </div>
                    <div className='register__form-group'>
                        <p></p>
                        <input onChange={onHandleChange} type='text' name='phone' placeholder="Số điện thoại" defaultValue={phone}></input>
                    </div>
                    <div className='register__form-group'>
                        <input onChange={onHandleChange} type='text' name='address' placeholder="Địa chỉ" defaultValue={address}></input>
                    </div>
                    <div className='register__form-group'>
                        <p>
                            Bằng cách đăng ký, bạn đồng ý với <span>Điều khoản dịch vụ</span> và <span>Chính sách quyền riêng tư</span> <br /> của <span> ClassDojo.</span>
                        </p>
                    </div>
                    <div className='register__form-group'>
                        <button type="submit" disabled={loading} className={loading ? 'register__form-button--disable' : ''}>
                            Đăng Ký
                        </button>
                    </div>
                </form>

            </div>
            <div className='register__indicator'></div>
            <p className='register__haveacc'>
                Đã có tài khoản?
                {role === 'teacher' ?
                    <Link to='/login/teacher'>Đăng nhập ở đây</Link> :
                    <Link to='/login/parent'>Đăng nhập ở đây</Link>}
            </p>
        </div >
    )
}

export default Register
