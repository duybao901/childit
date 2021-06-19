const express = require('express');

const router = express.Router();

const StudentController = require('../Controllers/Student.controller');
const auth = require('../Middleware/auth');
const authTeacher = require('../Middleware/authTeacher');

router.post('/create', auth, authTeacher, StudentController.createStudent);
router.get('/all_infor', StudentController.getAllStudentsInfor);
router.get('/:id', StudentController.getStudentInfor);
router.delete('/:id', StudentController.deleteStudent);
router.patch('/:id', StudentController.updateStudent);

module.exports = router;
