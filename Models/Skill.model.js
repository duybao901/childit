const mongoose = require('mongoose');

const SkillScheme = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        number: {
            type: Number,
            default: 1,
        },
        classId: {
            type: String,
        },
        avatar: {
            type: Object,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Skill', SkillScheme);
