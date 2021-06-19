const express = require('express');
const router = express.Router();

const auth = require('../Middleware/auth');
const authTeacher = require('../Middleware/authTeacher');

const SkillController = require('../Controllers/Skill.Controller');

// :id  : id class

router.post('/create', SkillController.createSkill);
router.get('/infor/:id', SkillController.getSkillInfor);
router.get('/all_infor', SkillController.getAllSkillInfor);
router.post('/update/:id', SkillController.updateSkillInfor);
router.delete('/delete/:id', SkillController.deleteSkill);

module.exports = router;
