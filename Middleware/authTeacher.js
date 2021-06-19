const User = require('../Models/Users.model');

const authTeacher = async (req, res, netx) => {
    try {
        const { id } = req.user;
        const user = await User.findById({ _id: id });
        if (user.role != 1) {
            return res.status(500).json({ msg: 'Bạn không đủ quyền truy cập' });
        }
        netx();
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

module.exports = authTeacher;
