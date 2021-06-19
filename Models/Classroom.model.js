const mongoose = require('mongoose');

// const skillData = require('../utils/SkillData');

const ClassScheme = new mongoose.Schema(
    {
        name: {
            // Tên lớp
            type: String,
            require: true,
        },
        userId: {
            // User Model -> user have role = 1 (Giao vien), Người tạo ra lớp này và quản lý
            type: String,
            require: true,
        },
        code: {
            // Mã code của lớp
            type: String,
            require: true,
            length: 6,
        },
        students: {
            // Một lớp gồm nhiều học sinh
            type: Array,
            default: [],
        },
        skills: {
            // Ky nang cua lop
            type: Array,
            default: [],
        },
        skillArray: {
            // mang tong diem cua cac hoc sinh
            type: Array,
            default: [],
        },
        skillArrayNotify: {
            // Mang luu thong bao khi cong diem
            type: Array,
            default: [],
        },
        allPoints: {
            // tat ca diem cua hoc sinh trong lop
            type: Number,
            default: 0,
        },
        parents: {
            // Mang chua cac phu huynh cua hoc sinh
            type: Array,
            default: [],
        },
        gradeId: {
            // Lop 1,2,3,4,5 ....
            type: String,
        },
        avatar: {
            // anh dai dien cua lop
            type: String,
            default: "https://res.cloudinary.com/dxnfxl89q/image/upload/v1622890302/Classdojo/class_img_9_zmh8u0.png"

        },
        yearBegin: {
            // nam hoc bat dau
            type: Date,
            require: true,
        },
        yearEnd: {
            // nam hoc ket thuc = nam bat dau + 6 thang
            type: Date,
            require: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Class', ClassScheme);
