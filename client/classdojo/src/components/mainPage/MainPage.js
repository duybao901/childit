import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
// Components
import Home from '../home/Home';
import Register from '../mainPage/auth/register/Register'
import Login from '../mainPage/auth/login/Login';
import ResetPassword from '../mainPage/auth/resetpassword/ResetPassword'
import PageNotFound from '../pageNotFound/PageNotFound'
import Lauchpad from '../mainPage/class/lauchpad/Lauchpad'
import ClassRoom from '../mainPage/class/classroom/ClassRoom'
import Report from '../mainPage/class/report/Report'
import Story from '../mainPage/parents/story/Story'
import Addchild from '../mainPage/class/addchild/AddChild'
function MainPage() {
    const auth = useSelector(state => state.auth);
    const { isLoggid, isTeacher, isParent } = auth;
    return (
        <div className='wrapper'>
            <Switch>
                <Route path='/' component={Home} exact />
                <Route path='/register/:role' component={Register}></Route>
                <Route path='/login/:role' component={Login}></Route>
                <Route path='/user/reset/:token' component={ResetPassword}></Route>
                <Route path='/lauchpad' component={isLoggid ? Lauchpad : Home}></Route>
                <Route path='/classroom/:id/points' component={isTeacher ? ClassRoom : Home} />
                <Route path='/classroom/:id/dashboard/reports/:studentid' component={isTeacher ? Report : Home} />
                <Route path='/story/:studentId' component={isParent ? Story : Home} />
                <Route path='/student/invite/:code' component={Addchild} />

                <Route component={PageNotFound}></Route>
            </Switch>
        </div>
    )
}

export default MainPage
