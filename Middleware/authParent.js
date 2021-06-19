const Users = require('../Models/Users.model');
const authParent = async (req, res, next) => {
    try {
        const { id } = req.user;
        const user = await Users.findById(id);
        if (user.role != 2) {
            return res.status(500).json({ msg: 'Bạn không đủ quyền truy cập' });
        }
        next();
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

module.exports = authParent;
