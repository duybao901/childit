const express = require('express');
const router = express.Router();

const GradeController = require('../Controllers/Grade.Controller');

// Grade
router.post('/create', GradeController.createGrade);
router.get('/all_infor', GradeController.getAllGrade);

module.exports = router;
