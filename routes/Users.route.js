const express = require('express');
const UsersController = require('../Controllers/Users.controller');
const router = express.Router();
const auth = require('../Middleware/auth');
const authTeacher = require('../Middleware/authTeacher');
const authParent = require('../Middleware/authParent');

const UserController = require('../Controllers/Users.controller');

router.post('/register', UserController.register);
router.post('/login', UsersController.login);
router.post('/login_teacher', UserController.loginTeacher);
router.post('/login_parent', UserController.loginParent);
router.get('/refresh_token', UserController.getAccessToken);
router.post('/forgot_password', UserController.forgotPassword);
router.post('/reset_password', auth, UserController.resetPassword);
router.get('/infor', auth, UserController.getUserInfor);
router.get('/all_infor', auth, authTeacher, UserController.getAllUserInfor);
router.get('/logout', UserController.logout);
router.patch('/update_infor', auth, UserController.updateUser);
router.post('/change_avatar', auth, UserController.changeAvatar);
router.post('/change_password', auth, UserController.changePassword);
router.post('/join_school', auth, authTeacher, UserController.joinSchool);
router.get('/get_classes', auth, authTeacher, UserController.getClasses);

// Parent
router.post('/invite_parent', UserController.inviteParent);
router.post('/add_child/:code', UserController.addChild);
router.get('/get_childs', auth,
    authParent, UserController.getChildsInfor);
router.delete(
    '/remove_child/:id', auth,
    authParent,
    UserController.removeChild,
);
module.exports = router;
