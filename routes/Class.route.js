const express = require('express');
const router = express.Router();

const ClassController = require('../Controllers/Class.Controller');

const auth = require('../Middleware/auth');
const authTeacher = require('../Middleware/authTeacher');

// Class
router.post('/create_class', auth, authTeacher, ClassController.createClass);
router.get('/:id', auth, authTeacher, ClassController.getClass);
router.delete('/:id', auth, authTeacher, ClassController.deleteClass);
router.patch('/:id', auth, authTeacher, ClassController.updateClass);
router.patch('/change_avatar/:id', auth, authTeacher, ClassController.changeAvatarClass);

// Class Student
router.post(
    '/add_students/:id',
    auth,
    authTeacher,
    ClassController.addStudents,
);
router.patch(
    '/delete_student/:id',
    auth,
    authTeacher,
    ClassController.deleteStudent,
);
router.patch(
    '/edit_student/:id',
    auth,
    authTeacher,
    ClassController.updateStudent,
);
router.patch(
    '/edit_student_avatar/:id',
    auth,
    authTeacher,
    ClassController.updateStudentAvatar,
);
router.post(
    '/plus_skill/:id',
    auth,
    authTeacher,
    ClassController.plusSkillStudent,
);
router.post(
    '/plus_whole_class/:id',
    auth,
    authTeacher,
    ClassController.plusWholeClass
);
router.post(
    '/plus_whole_group/:id',
    auth,
    authTeacher,
    ClassController.plusWholeGroup
);
// Class Skill
router.post('/add_skill/:id', auth, authTeacher, ClassController.addSkill);
router.get(
    '/class_skills/:id',
    auth,
    authTeacher,
    ClassController.getSkillClass,
);
router.patch(
    '/edit_skill/:id',
    auth,
    authTeacher,
    ClassController.editSkillClass,
);
router.patch(
    '/delete_skill/:id',
    auth,
    authTeacher,
    ClassController.deleteSkillClass,
);

module.exports = router;
