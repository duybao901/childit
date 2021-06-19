const Class = require('../Models/Classroom.model');
const Students = require('../Models/Student.model');
const Skills = require('../Models/Skill.model');
const Users = require('../Models/Users.model')
const async = require('async')
const mongoose = require('mongoose');

class ClassController {
    // Class
    async createClass(req, res) {
        try {
            const teacherId = req.user.id;
            const { name, gradeId } = req.body;
            const code = makeCode(6);

            if (!name || !gradeId) {
                return res
                    .status(400)
                    .json({ msg: 'Hãy điền hết các thông tin' });
            }

            var classroom;
            // Tao hoc ki : 6 thang
            var yearBegin = new Date();
            var yearEnd = new Date(
                new Date(yearBegin).setMonth(yearBegin.getMonth() + 6),
            );
            classroom = new Class({
                name,
                userId: teacherId,
                code,
                gradeId,
                yearBegin,
                yearEnd,
            });

            classroom = await classroom.save();

            return res.json({ msg: 'Tạo lớp học thành công', classroom });

        } catch (err) {
            if (err) return res.status(500).json({ msg: err.message });
        }
    }
    async getClass(req, res) {
        try {
            const { id } = req.params;
            var classroom = await Class.findById(id);

            if (!classroom) {
                return res.status(400).json({ msg: 'Không tìm thấy lớp học' });
            }
            return res.json({ classroom });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async deleteClass(req, res) {
        try {
            const { id } = req.params;
            await Class.findByIdAndDelete(id);
            await Semeter.findOneAndDelete({ classId: id });
            return res.json({ msg: 'Xóa lớp thành công' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async updateClass(req, res) {
        try {
            const { id } = req.params;
            const { name, gradeId } = req.body;

            const classroom = await Class.findById(id);
            if (!classroom) {
                return res.status(400).json({ msg: 'Không tìm thấy lớp học' });
            }

            await Class.findByIdAndUpdate(id, {
                name,
                gradeId,
            });

            return res.json({ msg: 'Chỉnh sữa lớp học thành công' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async changeAvatarClass(req, res) {
        try {
            const { id } = req.params;
            const { avatar } = req.body;
            await Class.findByIdAndUpdate(id, {
                avatar
            })
            return res.json({ msg: "Thay đổi ảnh lớp thành công" });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }

    // Student
    async addStudents(req, res) {
        try {
            const { id } = req.params;
            const classroom = await Class.findById(id);
            if (!classroom) {
                return res.status(400).json({ msg: 'Không tìm thấy lớp học' });
            }

            const { students } = req.body;
            const studentArrayObject = students.map((student) => {
                const code = makeCode(8);
                return {
                    name: student.name,
                    classId: id,
                    teacherId: req.user.id,
                    code,
                };
            });

            const studentArray = await Students.insertMany(studentArrayObject);

            await Class.findByIdAndUpdate(id, {
                students: classroom.students.concat(studentArray),
            });

            return res.json({ msg: 'Thêm học sinh thành công', studentArray });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async deleteStudent(req, res) {
        try {
            // id student
            const { id } = req.params;
            const { idStudent } = req.body;

            const student = await Students.findByIdAndDelete(idStudent);
            const parents = await Users.find();


            if (!student) {
                return res.status(400).json({ msg: 'Không tìm thấy học sinh' });
            }

            const classroom = await Class.findOne({ _id: id });
            if (!classroom) {
                return res.status(400).json({ msg: 'Không tìm thấy lớp học' });
            }

            parents.forEach(async (parent) => {
                await Users.updateOne({ _id: parent._id },
                    {
                        $pull:
                        {
                            childs: student._id
                        }
                    }
                );
            })

            // xoa hoc sinh khoi lop hoc
            await Class.updateOne(
                { _id: id },
                {
                    $pull: { "students": { "_id": mongoose.Types.ObjectId(idStudent) } },
                },
            );

            // update lai diem ca lop
            await Class.updateOne(
                { _id: id },
                {
                    $set: { allPoints: classroom.allPoints - student.skillNumber },
                },
            );

            return res.json({ msg: 'Xóa học sinh thành công' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async updateStudent(req, res) {
        try {
            const { id } = req.params;
            const { idStudent, name, birthDay, placeBorn, address } = req.body;

            const student = await Students.findOne({ _id: idStudent });

            if (!student) {
                return res.status(400).json({ msg: 'Không tìm thấy học sinh' });
            }

            const classroom = await Class.findOne({ _id: id });
            if (!classroom) {
                return res.status(400).json({ msg: 'Không tìm thấy lớp học' });
            }

            await Students.findByIdAndUpdate(
                { _id: idStudent },
                {
                    name,
                    birthDay,
                    placeBorn,
                    address
                },
            );

            await Class.updateOne(
                { _id: id, 'students._id': mongoose.Types.ObjectId(idStudent) },
                {
                    $set: {
                        'students.$.name': name,
                        'students.$.birthDay': birthDay,
                        'students.$.placeBorn': placeBorn,
                        'students.$.address': address,
                    },
                },
            );

            return res.json({ msg: 'Chỉnh sữa học sinh thành công', student });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
    async updateStudentAvatar(req, res) {
        try {
            const { id } = req.params;
            const { idStudent, avatar } = req.body;

            const student = await Students.findOne({ _id: idStudent });

            if (!student) {
                return res.status(400).json({ msg: 'Không tìm thấy học sinh' });
            }

            const classroom = await Class.findOne({ _id: id });
            if (!classroom) {
                return res.status(400).json({ msg: 'Không tìm thấy lớp học' });
            }

            await Students.findByIdAndUpdate(
                { _id: idStudent },
                {
                    avatar,
                },
            );

            await Class.updateOne(
                { _id: id, 'students._id': mongoose.Types.ObjectId(idStudent) },
                {
                    $set: {
                        'students.$.avatar': avatar,
                    },
                },
            );

            return res.json({ msg: 'Chỉnh sữa học sinh thành công', student });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
    async plusSkillStudent(req, res) {
        try {
            const { id } = req.params;
            const { idStudent, name, number, avatar } = req.body;

            if (!idStudent || !name || !number) {
                return res
                    .status(400)
                    .json({ msg: 'Hãy điền hết các thông tin' });
            }

            const classroom = await Class.findById(id);
            if (!classroom) {
                return res.json({ msg: 'Không tìm thấy lớp học' });
            }

            var student = await Students.findById(idStudent);
            if (!student) {
                return res.json({ msg: 'Không tìm thấy học sinh' });
            }

            const skillReq = {
                name,
                number: parseInt(number),
                avatar,
                date: new Date(),
            };

            //Kiem tra hoc sinh da co ky nang nay hay chua
            var studentHaveSkill = false;
            var skillNumberCur = 0;
            if (student.skillArray.length > 0) {
                student.skillArray.forEach((skill) => {
                    if (skill.name == skillReq.name) {
                        studentHaveSkill = true;
                        skillNumberCur = skill.number;
                    }
                });
            }
            // Co ky nang -> Cong vao
            // Khong co ky nang -> Them vao
            if (studentHaveSkill) {
                await Students.updateOne(
                    {
                        _id: mongoose.Types.ObjectId(idStudent),
                        'skillArray.name': skillReq.name,
                    },
                    {
                        $set: {
                            'skillArray.$.number':
                                parseInt(skillNumberCur) + parseInt(skillReq.number),
                        },
                    },
                );
            } else {
                await Students.updateOne(
                    { _id: mongoose.Types.ObjectId(idStudent) },
                    {
                        $push: {
                            skillArray: skillReq,
                        },
                    },
                );
            }
            // update skill notify
            const user = await Users.findById({ _id: req.user.id });
            // Cong diem skillNumber
            await Students.updateOne(
                { _id: mongoose.Types.ObjectId(idStudent) },
                {
                    $set: {
                        skillNumber: parseInt(student.skillNumber) + parseInt(skillReq.number),
                    },
                },
            );

            //Kiem tra lop hoc da co ky nang nay hay chua
            var classHaveSkill = false;
            var classSkillNumber = 0;
            if (classroom.skillArray.length > 0) {
                classroom.skillArray.forEach((skill) => {
                    if (skill.name == skillReq.name) {
                        classHaveSkill = true;
                        classSkillNumber = skill.number;
                    }
                });
            }
            // Co ky nang -> Cong vao
            // Khong co ky nang -> Them vao
            if (classHaveSkill) {
                await Class.updateOne(
                    {
                        _id: mongoose.Types.ObjectId(classroom._id),
                        'skillArray.name': skillReq.name,
                    },
                    {
                        $set: {
                            'skillArray.$.number':
                                parseInt(classSkillNumber) + parseInt(skillReq.number),
                        },
                    },
                );
            } else {
                await Class.updateOne(
                    { _id: mongoose.Types.ObjectId(classroom._id) },
                    {
                        $push: {
                            skillArray: skillReq,
                        },
                    },
                );
            }
            await Students.updateOne(
                { _id: mongoose.Types.ObjectId(idStudent) },
                {
                    $push: {
                        skillArrayNotify: { ...skillReq, createdAt: new Date().toISOString(), by: user.name, to: student.name },
                    },
                },
            );
            await Class.updateOne(
                { _id: mongoose.Types.ObjectId(classroom._id) },
                {
                    $push: {
                        skillArrayNotify: { ...skillReq, createdAt: new Date().toISOString(), by: user.name, to: student.name },
                    }
                },
            );


            // Tim lai hoc sinh do va update lai trong bang Class
            student = await Students.findById(idStudent);
            await Class.findByIdAndUpdate({ _id: id }, {
                allPoints: parseInt(classroom.allPoints) + parseInt(skillReq.number)
            })
            await Class.updateOne(
                { _id: id, 'students._id': student._id },
                {
                    $set: {
                        'students.$.skillNumber': student.skillNumber,
                        'students.$.skillArray': student.skillArray,
                        'students.$.skillArrayNotify': student.skillArrayNotify,
                    },
                },
            );

            return res.json({ msg: 'Cộng điểm kỹ năng thành công' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    // ******************************************************************************************
    async plusWholeClass(req, res) {
        try {
            const { id } = req.params;
            const { name, number, avatar } = req.body;

            const user = await Users.findById({ _id: req.user.id });

            if (!name || !number) {
                return res
                    .status(400)
                    .json({ msg: 'Hãy điền hết các thông tin' });
            }

            const classroom = await Class.findById(id);
            if (!classroom) {
                return res.json({ msg: 'Không tìm thấy lớp học' });
            }

            const skillReq = {
                name,
                number: parseInt(number),
                avatar,
                date: new Date(),
            };
            async.eachSeries(classroom.students, async (student) => {
                var studentHaveSkill = false;
                var skillNumberCur = 0;
                student.skillArray.forEach((skill) => {
                    if (skill.name == skillReq.name) {
                        studentHaveSkill = true;
                        skillNumberCur = skill.number;
                    }
                });

                // Co ky nang -> Cong vao
                // Khong co ky nang -> Them vao
                if (studentHaveSkill) {
                    await Students.updateOne(
                        {
                            _id: mongoose.Types.ObjectId(student._id),
                            'skillArray.name': skillReq.name,
                        },
                        {
                            $set: {
                                'skillArray.$.number':
                                    parseInt(skillNumberCur) + skillReq.number,
                                skillNumber:
                                    parseInt(student.skillNumber) + skillReq.number,
                            },
                        },
                    );
                } else {
                    await Students.updateOne(
                        { _id: mongoose.Types.ObjectId(student._id) },
                        {
                            $push: {
                                skillArray: skillReq,
                            },
                            $set: {
                                skillNumber:
                                    parseInt(student.skillNumber) + skillReq.number,
                            },
                        },
                    );
                }
                await Students.updateOne(
                    { _id: mongoose.Types.ObjectId(student._id) },
                    {
                        $push: {
                            skillArrayNotify: { ...skillReq, createdAt: new Date().toISOString(), by: user.name, to: student.name },
                        },
                    },
                );
                await Class.updateOne(
                    { _id: mongoose.Types.ObjectId(classroom._id) },
                    {
                        $push: {
                            skillArrayNotify: { ...skillReq, createdAt: new Date().toISOString(), by: user.name, to: student.name },
                        }
                    },
                );
            }, async (err) => {
                if (err) {
                    return res.status(500).json({ err })
                }
                const studentsUpdate = await Students.find({ classId: id });
                await Class.updateOne(
                    { _id: id },
                    {
                        $set: {
                            students: studentsUpdate,
                        },
                    },
                );
                await Class.findByIdAndUpdate({ _id: id }, {
                    allPoints: parseInt(classroom.allPoints) + parseInt(skillReq.number) * studentsUpdate.length
                })
                return res.json({ msg: 'success' })
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async plusWholeGroup(req, res) {
        try {
            const { id } = req.params;
            const { name, number, avatar, students } = req.body;

            const user = await Users.findById({ _id: req.user.id });

            if (!name || !number) {
                return res
                    .status(400)
                    .json({ msg: 'Hãy điền hết các thông tin' });
            }

            const classroom = await Class.findById(id);
            if (!classroom) {
                return res.json({ msg: 'Không tìm thấy lớp học' });
            }

            const skillReq = {
                name,
                number: parseInt(number),
                avatar,
                date: new Date(),
            };
            async.eachSeries(students, async (student) => {
                var studentHaveSkill = false;
                var skillNumberCur = 0;
                student.skillArray.forEach((skill) => {
                    if (skill.name == skillReq.name) {
                        studentHaveSkill = true;
                        skillNumberCur = skill.number;
                    }
                });

                // Co ky nang -> Cong vao
                // Khong co ky nang -> Them vao
                if (studentHaveSkill) {
                    await Students.updateOne(
                        {
                            _id: mongoose.Types.ObjectId(student._id),
                            'skillArray.name': skillReq.name,
                        },
                        {
                            $set: {
                                'skillArray.$.number':
                                    parseInt(skillNumberCur) + skillReq.number,
                                skillNumber:
                                    parseInt(student.skillNumber) + skillReq.number,
                            },
                        },
                    );
                } else {
                    await Students.updateOne(
                        { _id: mongoose.Types.ObjectId(student._id) },
                        {
                            $push: {
                                skillArray: skillReq,
                            },
                            $set: {
                                skillNumber:
                                    parseInt(student.skillNumber) + skillReq.number,
                            },
                        },
                    );
                }
                await Students.updateOne(
                    { _id: mongoose.Types.ObjectId(student._id) },
                    {
                        $push: {
                            skillArrayNotify: { ...skillReq, createdAt: new Date().toISOString(), by: user.name, to: student.name },
                        },
                    },
                );
                await Class.updateOne(
                    { _id: mongoose.Types.ObjectId(classroom._id) },
                    {
                        $push: {
                            skillArrayNotify: { ...skillReq, createdAt: new Date().toISOString(), by: user.name, to: student.name },
                        }
                    },
                );
            }, async (err) => {
                if (err) {
                    return res.status(500).json({ err })
                }
                const studentsUpdate = await Students.find({ classId: id });
                await Class.updateOne(
                    { _id: id },
                    {
                        $set: {
                            students: studentsUpdate,
                        },
                    },
                );
                await Class.findByIdAndUpdate({ _id: id }, {
                    allPoints: parseInt(classroom.allPoints) + parseInt(skillReq.number) * students.length
                })
                return res.json({ msg: 'success' })
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async getAllSkillClass(req, res) {
        try {

        } catch (err) {
            if (err) return res.status(500).json({ msg: err.message });
        }
    }


    // Skill
    async addSkill(req, res) {
        try {
            const { name, number, avatar } = req.body;
            const { id } = req.params;

            var classroom = await Class.findById(id);
            if (!classroom) {
                return res.status(400).json({ msg: 'Không tìm thấy lớp học' });
            }
            const skill = new Skills({
                name,
                number,
                avatar,
            });
            await skill.save();

            classroom.skills.push(skill);
            await Class.findByIdAndUpdate(id, {
                skills: classroom.skills,
            });
            return res.json({ msg: 'Thêm kỹ năng thành công', skill });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async getSkillClass(req, res) {
        try {
            const { id } = req.params;
            var classroom = await Class.findById(id);
            if (!classroom) {
                return res.status(400).json({ msg: 'Không tìm thấy lớp học' });
            }

            return res.json({ skills: classroom.skills });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async editSkillClass(req, res) {
        try {
            const { id } = req.params;
            const { idSkill, name, number, avatar } = req.body;

            if (!idSkill || !name || !number || !avatar) {
                return res
                    .status(400)
                    .json({ msg: 'Hãy điền hết các thông tin' });
            }

            const classroom = await Class.findById(id);
            if (!classroom) {
                return res.status(400).json({ msg: 'Không tìm thấy lớp học' });
            }

            const skill = await Skills.findByIdAndUpdate(
                { _id: idSkill },
                {
                    name,
                    number,
                    avatar,
                },
            );
            if (!skill) {
                return res.status(400).json({ msg: 'Không tìm thấy kỹ năng' });
            }
            await Skills.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(idSkill) }, {
                name,
                number,
                avatar: { ...avatar },
            })

            await Class.updateOne(
                { _id: mongoose.Types.ObjectId(id), 'skills._id': mongoose.Types.ObjectId(idSkill) },
                {
                    $set: {
                        'skills.$.name': name,
                        'skills.$.number': parseInt(number),
                        'skills.$.avatar': avatar,
                    },
                },
            );

            return res.json({ msg: 'Chỉnh sữa kỹ năng thành công' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async deleteSkillClass(req, res) {
        try {
            const { id } = req.params;
            const { idSkill } = req.body; // Id skill
            const classroom = await Class.findById(id);

            if (!classroom) {
                return res.status(400).json({ msg: 'Không tìm thấy lớp học' });
            }

            const skill = await Skills.findByIdAndDelete(idSkill);
            if (!skill) {
                return res.status(400).json({ msg: 'Không tìm thấy kỹ năng' });
            }
            await Class.updateOne(
                { _id: id },
                {
                    $pull: { "skills": skill },
                },
            );

            return res.json({ msg: 'Xóa kỹ năng thành công' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

function makeCode(length) {
    var result = [];
    var characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(
            characters.charAt(Math.floor(Math.random() * charactersLength)),
        );
    }
    return result.join('');
}

module.exports = new ClassController();
