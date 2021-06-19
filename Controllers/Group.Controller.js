const Groups = require("../Models/Group.modal");
const Classes = require("../Models/Classroom.model");
const Users = require('../Models/Users.model');
const Students = require("../Models/Student.model")

const mongoose = require('mongoose')

class GroupController {
    async createGroup(req, res) {
        try {
            const { id } = req.params;
            const { groupName, students } = req.body;

            var classroom = await Classes.findById(id);
            if (!classroom) {
                return res.status(400).json({ msg: 'Không tìm thấy lớp học' });
            }
            var group = await Groups.findOne({ classId: classroom._id, groupName });
            if (group) {
                return res.status(400).json({ msg: 'Nhóm đã tồn tại' });
            }

            var teacher = await Users.findById({ _id: req.user.id });

            var newGroup = new Groups({
                groupName,
                students,
                teacherId: teacher._id,
                classId: classroom._id
            })

            group = await newGroup.save();

            // students.forEach(async (student) => {
            //     await Students.updateOne(
            //         { _id: mongoose.Types.ObjectId(student) },
            //         {
            //             $push: {
            //                 groups: { groupName, groupId: group._id },
            //             },
            //         },
            //     );
            // })

            return res.json({ msg: "Tạo nhóm thành công", group })

        } catch (err) {
            if (err) return res.status(500).json({ msg: err.message })
        }
    }
    async editGroup(req, res) {
        try {
            const { id } = req.params;
            const { groupName, students } = req.body;

            var group = await Groups.findById(id);
            if (!group) {
                return res.status(400).json({ msg: 'Nhóm không tồn tại' });
            }

            await Groups.findByIdAndUpdate(id, {
                groupName,
                students
            })
            await Groups.findById(id, function (err, groupUpdate) {
                if (err) return res.status(400).json({ msg: err.message });
                return res.json({ msg: "Chỉnh sủa thành công", group: groupUpdate });
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
    async deleteGroup(req, res) {
        try {
            const { id } = req.params;

            var group = await Groups.findById(id);
            if (!group) {
                return res.status(400).json({ msg: 'Nhóm không tồn tại' });
            }

            await Groups.findByIdAndDelete(id);

            return res.json({ msg: "Xóa nhóm thành công" });

        } catch (err) {
            if (err) return res.status(500).json({ msg: err.message });
        }
    }
    async getGroupClass(req, res) {
        try {
            // id = classId
            const { id } = req.params;

            var classroom = await Classes.findById(id);
            if (!classroom) {
                return res.status(400).json({ msg: 'Không tìm thấy lớp học' });
            }

            const groups = await Groups.find({ classId: id });
            return res.json({ groups });

        } catch (err) {
            if (err) return res.status(500).json({ msg: err.message });
        }
    }
    async getStudentInforClass(req, res) {
        try {
            // id = classId
            const { id } = req.params;

            var classroom = await Classes.findById(id);
            if (!classroom) {
                return res.status(400).json({ msg: 'Không tìm thấy lớp học' });
            }

            await Groups.find({ classId: id }, async (err, docs) => {
                if (err) return res.status(400).json({ msg: err.message });
                let livePromise = [];
                for (let doc of docs) {
                    var groupName = doc.name;
                    for (let student of doc.students) {
                        livePromise.push(new Promise(resovle => {
                            Students.find({ _id: mongoose.Types.ObjectId(student) }, (err, docs) => {
                                docs[0].groupName = groupName;
                                resovle(docs[0]);
                            })
                        }))
                    }
                    const students = await Promise.all(livePromise);
                    return res.json({ students });;
                }
                return res.json({ groupStudentInfor });
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = new GroupController();