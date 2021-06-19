const express = require('express');
const router = express.Router();

const GroupController = require('../Controllers/Group.Controller');

const auth = require('../Middleware/auth');
const authTeacher = require('../Middleware/authTeacher');

router.post('/create_group/:id', auth, authTeacher, GroupController.createGroup);
router.patch('/edit_group/:id', auth, authTeacher, GroupController.editGroup);
router.delete('/delete_group/:id', auth, authTeacher, GroupController.deleteGroup);
router.get('/get_group_class/:id', auth, authTeacher, GroupController.getGroupClass);
router.get('/get_student_infor/:id', auth, authTeacher, GroupController.getStudentInforClass)


module.exports = router;