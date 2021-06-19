const mongoose = require('mongoose');

const schoolScheme = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        address: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('School', schoolScheme);
