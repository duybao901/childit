const mongoose = require('mongoose');
// Hoc ki cua 1 lop gom 6 thang tinh tu luc tao ra lop
const semesterScheme = new mongoose.Schema(
    {
        yearBegin: {
            type: Date,
            require: true,
        },
        yearEnd: {
            type: Date,
            require: true,
        },
        classId: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Semester', semesterScheme);
