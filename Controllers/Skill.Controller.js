const Skills = require('../Models/Skill.model');

class SkillController {
    async createSkill(req, res) {
        try {
            const { name, number, avatar } = req.body;

            var skill = await Skills.findOne({ name });
            if (skill) {
                return res.status(400).json({ msg: 'Kỹ năng đã tồn tại' });
            }

            skill = new Skills({
                name,
                number,
                avatar,
            });

            await skill.save();
            return res.json({ skill });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async getSkillInfor(req, res) {
        try {
            const { id } = req.params;

            const skill = await Skills.findById(id);

            return res.json({ skill });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async getAllSkillInfor(req, res) {
        try {
            const allSkill = await Skills.find();
            return res.json(allSkill);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async updateSkillInfor(req, res) {
        try {
            const { id } = req.params;
            const { name, numberAdd, avatar } = req.body;

            var skill = await Skills.findById(id);
            if (!skill) {
                return res.status(400).json({ msg: 'Không tìm thấy kỹ năng' });
            }

            await Skills.findByIdAndUpdate(id, {
                name,
                numberAdd,
                avatar,
            });

            return res.json({ msg: 'Chỉnh sữa kỹ năng thành công' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async deleteSkill(req, res) {
        try {
            const { id } = req.params;

            var skill = await Skills.findById(id);
            if (!skill) {
                return res.status(400).json({ msg: 'Không tìm thấy kỹ năng' });
            }

            await Skills.findByIdAndDelete(id);

            return res.json({ msg: 'Xóa kỹ năng thành công' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = new SkillController();
