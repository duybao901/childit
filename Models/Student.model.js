const mongoose = require('mongoose');
const StudentScheme = new mongoose.Schema(
    {
        name: {
            // Tên của học sinh
            type: String,
            require: true,
        },
        skillNumber: {
            // Điểm của học sinh
            type: Number,
            default: 0,
        },
        skillArray: {
            // Diem ky nang cua hoc sinh
            type: Array,
            default: [],
        },
        skillArrayNotify: {
            // Diem ky nang cua hoc sinh de thong bao 
            type: Array,
            default: [],
        },
        // groups: {
        //     type: Array,
        //     default: []
        // },
        avatar: {
            // Ảnh đại diện cho hoc sinh
            type: String,
            default: 'https://res.cloudinary.com/dxnfxl89q/image/upload/v1622909280/Classdojo/student_avatar_1_em4dxj.png',
            require: true,
        },
        // parent cua hoc sinh
        parents: {
            type: Array,
            default: [],
        },
        teacherId: {
            type: String,
        },
        classId: {
            type: String,
        },
        code: {
            type: String,
        },
        birthDay: {
            // Ngay sinh
            type: Date,
            default: new Date(),
        },
        placeBorn: {
            // Noi sinh
            type: String,
            default: "",
        },
        address: {
            // Dia chi
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Student', StudentScheme);
