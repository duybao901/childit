const express = require('express');

const router = express.Router();

const SchollController = require('../Controllers/School.Controller');

router.post('/create', SchollController.createSchool);
router.get('/infor/:id', SchollController.getSchoolInfor);
router.get('/all_infor', SchollController.getAllSchoolsinfor);

module.exports = router;
