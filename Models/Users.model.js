const mongoose = require('mongoose');
const userScheme = new mongoose.Schema(
    {
        name: {
            // Tên người dùng
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
        address: {
            type: String,
        },
        school: {
            type: Object,
        },
        role: {
            // Vai trò
            type: Number,
            default: 1, // 1 : teacher, 2 : parent,
            required: true,
        },
        avatar: {
            // Ảnh đại diện
            type: Object,
            default: {
                publicj_id: '',
                url:
                    'https://res.cloudinary.com/dxnfxl89q/image/upload/v1609941293/javcommerce/person_slkixq.jpg',
            },
            require: true,
        },
        childs: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Users', userScheme);
