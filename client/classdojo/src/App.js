import React, { useEffect } from 'react'
import './App.css';
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios'
import * as tokenAction from './redux/actions/tokenAction'
import * as authAction from './redux/actions/authAction';
import * as classAction from './redux/actions/classAction';
import * as gradeAction from './redux/actions/gradeAction';
// Components 
import MainPage from './components/mainPage/MainPage';

function App() {
    const disPatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const { token } = useSelector(state => state.token);

    // Get accresstoken
    useEffect(() => {
        var firstLogin = localStorage.getItem('firstlogin');
        if (firstLogin) {
            var getToken = async () => {
                const res = await axios.get('/user/refresh_token');
                disPatch(tokenAction.getToken(res.data));
            }
            getToken();

        };
    }, [disPatch, auth.isLoggid])

    // Get user infor
    useEffect(() => {
        if (token) {
            const getUser = async () => {
                // Get Infor
                disPatch(authAction.login());
                authAction.fetchUser(token).then(res => {
                    disPatch(authAction.getUserInfor(res));
                }).catch(err => {
                    if (err) throw err;
                })
                if (auth.isParent) {
                    authAction.fectChilds(token).then(res => {
                        disPatch(authAction.getChilds(res))
                    }).catch(err => {
                        if (err) console.log(err);
                    })
                }
                if (auth.isTeacher) {
                    // Get Class
                    classAction.fetchClasses(token).then(res => {
                        disPatch(classAction.getClasses(res));
                    }).catch(err => {
                        if (err) throw err;
                    })
                    // Get Grades
                    gradeAction.fetchGrades().then(res => {
                        disPatch(gradeAction.getGrades(res))
                    }).catch(err => {
                        if (err) throw err;
                    })
                }
            }
            getUser();
        }
    }, [token, disPatch, auth.isTeacher, auth.isParent])

    return (
        <Router>
            <div className="App">
                <ToastContainer />
                <MainPage></MainPage>
            </div>
        </Router>
    );
}

export default App;
