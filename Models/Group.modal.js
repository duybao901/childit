const mongoose = require('mongoose');

const groupScheme = new mongoose.Schema(
    {
        groupName: {
            type: String,
            require: true,
        },
        classId: {
            type: String,
            require: true,
        },
        students: {
            type: Array,
            default: [],
        },
        teacherId: {
            type: String,
            
        }
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Group', groupScheme);
