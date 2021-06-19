const Users = require('../Models/Users.model');
const School = require('../Models/School.model');
const Students = require('../Models/Student.model');
const Class = require('../Models/Classroom.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendMail');
const sendMailParent = require('../utils/sendMailParent');
const { CLIENT_URL } = process.env;
const mongoose = require('mongoose');

// Class User
class UsersController {
    async register(req, res) {
        try {
            const {
                name,
                email,
                password,
                confirmPassword,
                phone,
                address,
                role,
            } = req.body;
            if (
                !name ||
                !email ||
                !password ||
                !confirmPassword ||
                !phone ||
                !address ||
                !role
            ) {
                return res
                    .status(400)
                    .json({ msg: 'Hãy điền hết các thông tin' });
            }

            if (validateEmail(email) == false) {
                return res.status(400).json({ msg: 'Email không hợp lệ' });
            }

            const user = await Users.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: 'Người dùng đã tồn tại' });
            }

            if (password.length < 8) {
                return res
                    .status(400)
                    .json({ msg: 'Mật khẩu phải có ít nhất 8 ký tự' });
            }

            if (password !== confirmPassword) {
                return res
                    .status(400)
                    .json({ msg: 'Mật khẩu không trùng khớp' });
            }

            const passwordHash = await bcrypt.hash(password, 12);

            const newUser = new Users({
                name,
                email,
                password: passwordHash,
                phone,
                address,
                role,
            });

            await newUser.save();
            return res.json({ msg: 'Đăng kí thành công' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res
                    .status(400)
                    .json({ msg: 'Hãy điền hết các thông tin' });
            }

            const user = await Users.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: 'Email không tồn tại' });
            }

            const isPassword = await bcrypt.compare(password, user.password);
            if (!isPassword) {
                return res.status(400).json({ msg: 'Sai mật khẩu' });
            }

            const refreshToken = createRefreshToken(
                { id: user._id },
                process.env.CREATE_REFRESH_TOKEN,
            );
            res.cookie('refreshtoken', refreshToken, {
                httpOnly: true,
                path: 'user/refresh_token',
                maxAge: 24 * 60 * 60 * 1000, // 7 day
            });

            return res.json({ msg: 'Đăng nhập thành công' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async loginTeacher(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res
                    .status(400)
                    .json({ msg: 'Hãy điền hết các thông tin' });
            }

            const user = await Users.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: 'Email không tồn tại' });
            }

            const isPassword = await bcrypt.compare(password, user.password);
            if (!isPassword) {
                return res.status(400).json({ msg: 'Sai mật khẩu' });
            }

            if (user.role != 1) {
                return res.status(400).json({ msg: 'Bạn không phải là giáo viên' });
            }

            const refreshToken = createRefreshToken(
                { id: user._id },
                process.env.CREATE_REFRESH_TOKEN,
            );
            res.cookie('refreshtoken', refreshToken, {
                httpOnly: true,
                path: 'user/refresh_token',
                maxAge: 24 * 60 * 60 * 1000, // 1d
            });

            return res.json({ msg: 'Đăng nhập thành công' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async loginParent(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res
                    .status(400)
                    .json({ msg: 'Hãy điền hết các thông tin' });
            }

            const user = await Users.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: 'Email không tồn tại' });
            }

            const isPassword = await bcrypt.compare(password, user.password);
            if (!isPassword) {
                return res.status(400).json({ msg: 'Sai mật khẩu' });
            }
            if (user.role != 2) {
                return res.status(400).json({ msg: 'Bạn không phải là phụ huynh' });
            }

            const refreshToken = createRefreshToken(
                { id: user._id },
                process.env.CREATE_REFRESH_TOKEN,
            );
            res.cookie('refreshtoken', refreshToken, {
                httpOnly: true,
                path: 'user/refresh_token',
                maxAge: 24 * 60 * 60 * 1000, // 1 day
            });

            return res.json({ msg: 'Đăng nhập thành công' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async getAccessToken(req, res) {
        try {
            const refrestoken = req.cookies.refreshtoken;

            if (!refrestoken) {
                return res.status(400).json({ msg: 'Hãy đăng nhập !' });
            }
            jwt.verify(
                refrestoken,
                process.env.CREATE_REFRESH_TOKEN,
                (err, user) => {
                    if (err) {
                        return res.status(400).json({ msg: 'Hãy đăng nhập !' });
                    }
                    const accessToken = createAccessToken({ id: user.id });

                    return res.json(accessToken);
                },
            );
        } catch (err) {
            return res.status(400).json({ msg: err.message });
        }
    }
    async forgotPassword(req, res) {
        try {
            const { email } = req.body;

            const user = await Users.findOne({ email });
            if (!user) {
                return res
                    .status(400)
                    .json({ msg: 'Người dùng không tồn tại!' });
            }

            const accessToken = createAccessToken(
                { id: user._id },
                process.env.CREATE_ACCESS_TOKEN,
            );
            const url = `${CLIENT_URL}/user/reset/${accessToken}`;
            sendMail(email, url, 'Xác thực email');
            res.json({ msg: 'Xác thực email của bạn' });
        } catch (err) {
            return res.status(400).json({ msg: err.message });
        }
    }
    async resetPassword(req, res) {
        try {
            const { password } = req.body;
            const passwordHash = await bcrypt.hash(password, 12);

            await Users.findByIdAndUpdate(
                { _id: req.user.id },
                {
                    password: passwordHash,
                },
            );

            return res.json({ msg: 'Mật khẩu đã được thay đổi thành công' });
        } catch (err) {
            return res.status(400).json({ msg: err.message });
        }
    }
    async getUserInfor(req, res) {
        try {
            const { id } = req.user;
            const user = await Users.findById({ _id: id });
            return res.json(user);
        } catch (err) {
            if (err) return res.status(500).json({ msg: err.message });
        }
    }
    async getAllUserInfor(req, res) {
        try {
            const users = await Users.find();
            return res.json(users);
        } catch (err) {
            if (err) return res.status(500).json({ msg: err.message });
        }
    }
    async updateUser(req, res) {
        try {
            const { name, email, phone, address } = req.body;
            if (!name || !email || !phone || !address) {
                return res
                    .status(400)
                    .json({ msg: 'Hãy điền hết các thông tin' });
            }

            if (validateEmail(email) == false) {
                return res.status(400).json({ msg: 'Email không hợp lệ' });
            }

            await Users.findByIdAndUpdate(
                { _id: req.user.id },
                {
                    name,
                    email,
                    phone,
                    address,
                },
            );

            return res.json({ msg: 'Thay đổi thông tin thành công' });
        } catch (err) {
            if (err) return res.status(500).json({ msg: err.message });
        }
    }
    async changeAvatar(req, res) {
        try {
            const { avatar } = req.body;

            if (!avatar) {
                return res.status(400).json({ msg: 'Không tìm thấy ảnh' });
            }

            await Users.findByIdAndUpdate(
                { _id: req.user.id },
                {
                    avatar,
                },
            );

            return res.json({ msg: 'Thay đổi ảnh thành công' });
        } catch (err) {
            if (err) return res.status(500).json({ msg: err.message });
        }
    }
    async changePassword(req, res) {
        try {
            const { password, confirmPassword } = req.body;
            if (!password || !confirmPassword) {
                return res.status(400).json({ msg: 'Điền hết các thông tin' });
            }
            if (password.length < 8) {
                return res
                    .status(400)
                    .json({ msg: 'Mật khẩu phải có ít nhất 6 ký tự' });
            }

            if (password !== confirmPassword) {
                return res.status(400).json({ msg: 'Mật khẩu không khớp' });
            }

            const passwordHash = await bcrypt.hash(password, 12);

            await Users.findByIdAndUpdate(
                { _id: req.user.id },
                {
                    password: passwordHash,
                },
            );

            return res.json({ msg: 'Thay đổi mật khẩu thành công' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async logout(req, res) {
        try {
            res.clearCookie("refreshtoken", { path: "user/refresh_token" });
            return res.json({ msg: "Đăng xuất thành công" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async joinSchool(req, res) {
        try {
            const { id } = req.body;
            const school = await School.findById(id);
            if (!school) {
                return res
                    .status(400)
                    .json({ msg: 'Không tìm thấy trường học' });
            }
            await Users.findByIdAndUpdate(
                { _id: req.user.id },
                {
                    school,
                },
            );
            return res.json({ msg: 'Join trường học thành công' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async inviteParent(req, res) {
        try {
            const { email, code, classId } = req.body;
            const user = await Users.findOne({ email });
            if (!user) {
                return res
                    .status(400)
                    .json({ msg: 'Người dùng không tồn tại!' });
            }

            var student = await Students.findOne({ code });
            if (!student) {
                return res.status(400).json({ msg: 'Mã code không đúng' });
            }
            if (user.role !== 2) {
                return res
                    .status(400)
                    .json({ msg: 'Bạn không phải là vai trò phụ huynh' });
            }
            var classroom = await Class.findById(classId);
            var teacher = await Users.findById(student.teacherId);
            var flag = false;
            if (student.parents.length > 0) {
                student.parents.forEach((parent) => {
                    if (parent.email === user.email) {
                        flag = true;
                    }
                })
            }
            var url = `${CLIENT_URL}/student/invite/${code}`;
            if (flag) {
                sendMailParent(email, url, code);
            } else {
                // 1 dang moi
                student.parents.push({ id: user._id, name: user.name, email, status: 1, idStudents: student._id, className: classroom.name, dateJoin: classroom.yearBegin, teacher: teacher.name });
                await Students.updateOne(
                    { _id: student._id },
                    { $set: { parents: student.parents } },
                );
                sendMailParent(email, url, code);
            }
            res.json({ msg: 'Xác thực email của bạn', parent: { id: user._id, name: user.name, email, status: 1, idStudents: student._id, className: classroom.name } });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async addChild(req, res) {
        try {
            const { email, password } = req.body;
            const { code } = req.params;

            if (!email || !password) {
                return res
                    .status(400)
                    .json({ msg: 'Hãy điền hết các thông tin' });
            }

            const user = await Users.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: 'Email không tồn tại' });
            }

            const isPassword = await bcrypt.compare(password, user.password);
            if (!isPassword) {
                return res.status(400).json({ msg: 'Sai mật khẩu' });
            }

            if (user.role !== 2) {
                return res.status(400).json({ msg: 'Bạn không phải là vai trò phụ huynh' });
            }

            var student = await Students.findOne({ code });
            if (!student) {
                return res.status(400).json({ msg: 'Mã code không đúng' });
            }

            // parent
            const parent = await Users.findOne({ email });
            if (parent.childs.includes(mongoose.Types.ObjectId(student._id))) {
                return res.status(400).json({ msg: 'Học sinh này đã tồn tại' });
            } else {
                parent.childs.push(student._id);
            }

            await Users.updateOne(
                { email },
                { $set: { childs: parent.childs } },
            );

            // xac thuc email thanh cong
            await Students.updateOne(
                { _id: mongoose.Types.ObjectId(student._id), 'parents.idStudents': mongoose.Types.ObjectId(student._id) },
                {
                    $set:
                    {
                        'parents.$.status': 2,
                        'parents.$.email': parent.email
                    }
                },
            );

            Students.findOne({ code }, async (err, student) => {
                if (err) return res.status(400).json({ msg: err.message });
                await Class.updateOne(
                    { _id: mongoose.Types.ObjectId(student.classId), 'students._id': mongoose.Types.ObjectId(student._id) },
                    {
                        $set: {
                            'students.$.parents': student.parents,
                        },
                    },
                );
                return res.json({ msg: 'Thêm trẻ thành công' });
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async getChildsInfor(req, res) {
        try {
            const { id } = req.user;
            const user = await Users.findById(id);
            const students = await Students.find({ _id: { $in: user.childs } });
            return res.json({ students });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async removeChild(req, res) {
        try {
            const { id } = req.params;

            await Users.updateOne(
                { _id: req.user.id },
                { $pull: { childs: mongoose.Types.ObjectId(id) } },
            );

            return res.json({ msg: 'Xóa trẻ thành công' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async getClasses(req, res) {
        try {
            const classes = await Class.find({ userId: req.user.id });
            return res.json({ classes });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

function validateEmail(email) {
    const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(String(email).toLowerCase());
}

function createAccessToken(payload) {
    return jwt.sign(payload, process.env.CREATE_ACCESS_TOKEN, {
        expiresIn: '1d',
    });
}

function createRefreshToken(payload) {
    return jwt.sign(payload, process.env.CREATE_REFRESH_TOKEN, {
        expiresIn: '1d',
    });
}

module.exports = new UsersController();
