import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import registerLogoImage from '../../../../assets/img/logo.svg'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { isEmail, isEmpty } from '../../../../ultis/validations';
import { ShowSuccessMessage, ShowErrorMessage } from '../../../../ultis/notify';

import * as classAction from '../../../../redux/actions/classAction'

// Redux
const state = {
    email: '',
    password: '',
    err: '',
    success: '',
    loading: false,
}
function AddChild() {
    const params = useParams();
    const { code } = params;
    const { classes } = useSelector(state => state.classes);
    const [user, setUser] = useState(state);
    const dispatch = useDispatch();
    const [student, setStudent] = useState("")
    const { email, password, err, success, loading } = user;

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        if (isEmpty(email) || isEmpty(password)) {
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
        try {
            setUser({
                ...user,
                loading: true,
            })
            var res;

            res = await axios.post(`/user/add_child/${code}`, {
                email, password
            })
            dispatch(classAction.addChild(email, student._id, student.classId))
            // history.push('/');
            setUser({
                ...user,
                success: res.data.msg,
                loading: false,
            });

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

    useEffect(() => {
        classes.forEach(classroom => {
            classroom.students.forEach(student => {
                console.log(student.code, code)
                if (student.code === code) {
                    setStudent(student)
                }
            })
        })
    }, [code, student, classes]);

    return (
        <div>
            <div className='register'>
                <div className="register__header">
                    <Link to='/'>
                        <img alt="logo-regiser" src={registerLogoImage}></img>
                    </Link>
                </div>
                <h2 className="register__title login__title">Chào mừng cha mẹ của {student && student.name}</h2>
                {err ? ShowErrorMessage(err) : ''}
                {success ? ShowSuccessMessage(success) : ''}
                {loading ? (<div className='login__loading' ><img className='login__loading-img' src="https://res.cloudinary.com/dxnfxl89q/image/upload/v1622274370/Classdojo/loading_umu1sx.gif" alt='forgot-loading'></img></div>) : ''}
                <div className='register__form login__form'>
                    <form onSubmit={onHandleSubmit} >
                        <div className='register__form-group login__form-group'>
                            <input onChange={onHandleChange} type='email' name='email' placeholder="Email" defaultValue={email}></input>
                        </div>
                        <div className='register__form-group login__form-group'>
                            <input onChange={onHandleChange} type='password' name='password' placeholder="Mật khẩu" defaultValue={password} autoComplete='true'></input>
                        </div>
                        <div className='register__form-group login__form-group'>
                            <button type="submit" disabled={loading} className={loading ? 'register__form-button--disable' : ''}>
                                Thêm trẻ
                            </button>
                        </div>
                    </form>

                </div>
            </div >
        </div>
    )
}

export default AddChild
