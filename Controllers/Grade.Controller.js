const Grades = require('../Models/Grade.model');

class GradeController {
    // Grade
    async createGrade(req, res) {
        try {
            const { gradeName } = req.body;
            if (!gradeName) {
                return res
                    .status(400)
                    .json({ msg: 'Hãy điền hết các thông tin' });
            }

            let grade = await Grades.findOne({ gradeName });
            if (grade) {
                return res.status(400).json({ msg: `Lớp này đã tồn tại` });
            } else {
                grade = new Grades({
                    gradeName,
                });

                await grade.save();
                return res.json({ msg: 'Tạo thành công' });
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async getAllGrade(req, res) {
        try {
            const grades = await Grades.find({});
            return res.json({ grades });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = new GradeController();
