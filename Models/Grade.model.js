const mongoose = require('mongoose');

const gradeScheme = new mongoose.Schema(
    {
        gradeName: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Grade', gradeScheme);
