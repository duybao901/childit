const Schools = require('../Models/School.model');
class SchoolController {
    async createSchool(req, res) {
        try {
            const { name, address } = req.body;
            if (!name || !address) {
                return res
                    .status(400)
                    .json({ msg: 'Hãy điền hết các thông tin' });
            }

            var school = await Schools.findOne({ name });
            if (school) {
                return res.status(400).json({ msg: 'Trường học đã tồn tại' });
            }

            school = new Schools({
                name,
                address,
            });

            await school.save();

            return res.json({ msg: 'Tạo trường học thành công' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async getSchoolInfor(req, res) {
        try {
            const { id } = req.params;
            const school = await Schools.findById(id);
            if (!school) {
                return res
                    .status(400)
                    .json({ msg: 'Trường học không tồn tại' });
            }
            return res.json(school);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async getAllSchoolsinfor(req, res) {
        try {
            const schools = await Schools.find();
            return res.json(schools);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = new SchoolController();
