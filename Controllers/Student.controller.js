const Students = require('../Models/Student.model');

class StudentController {
    async createStudent(req, res) {
        try {
            const teacherId = req.user.id;
            const { name, classId } = req.body;
            if (wordCount(name) <= 1) {
                return res
                    .status(400)
                    .json({ msg: 'Tên học sinh không hợp lệ' });
            }
            var student;
            student = await Students.findOne({ name });
            if (student) {
                return res.status(400).json({ msg: 'Học sinh này đã tồn tại' });
            }

            student = new Students({
                name,
                teacherId,
            });

            await student.save();
            return res.json({ msg: 'Tạo học sinh thành công' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async getAllStudentsInfor(req, res) {
        try {
            const students = await Students.find();
            return res.json({ students });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async getStudentInfor(req, res) {
        try {
            const { id } = req.params;
            const student = await Students.findById(id);
            if (!student) {
                return res.status(400).json({ msg: 'Không tìm thấy học sinh' });
            }

            return res.json({ student });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async deleteStudent(req, res) {
        try {
            const { id } = req.params;

            const student = await Students.findById(id);

            if (!student) {
                return res.status(400).json({ msg: 'Không tìm thấy học sinh' });
            }

            await Students.findByIdAndDelete(id);
            return res.json({ msg: ' Xóa học sinh thành công' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async updateStudent(req, res) {
        try {
            const { id } = req.params;
            const { name, teacherId, parentId, avatar, birthDay, placeBorn, address } = req.body;

            const student = await Students.findById(id);

            if (!student) {
                return res.status(400).json({ msg: 'Không tìm thấy học sinh' });
            }

            await Students.findByIdAndUpdate(id, {
                name,
                teacherId,
                parentId,
                avatar,
                birthDay,
                placeBorn,
                address
            });

            return res.json({ msg: 'Chỉnh sữa học sinh thành công' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async updateSkill(req, res) {
        try {
            const { skill } = req.body;
            const { id } = req.params;
            const student = await Students.findById(id);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

function wordCount(str) {
    return str.split(' ').length;
}

module.exports = new StudentController();
