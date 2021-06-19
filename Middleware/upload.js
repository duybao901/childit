const uploadImg = (req, res, next) => {
    try {
        if (!req.files || Object.keys(req.files) === 0) {
            return res
                .status(400)
                .json({ msg: 'Không có tập tin nào được tải lên' });
        }

        const file = req.files.file;

        if (file.size > 1024 * 1024) {
            // 1mb
            return res
                .status(400)
                .json({ msg: 'Vui lòng tải lên một hình ảnh nhỏ hơn 1 MB.' });
        }

        if (
            file.mimetype !== 'image/png' &&
            file.mimetype !== 'image/jpeg' &&
            file.mimetype !== 'image/jpg'
        ) {
            return res
                .status(400)
                .json({ msg: 'Vui lòng tải lên một hình ảnh' });
        }

        next();
    } catch (err) {
        if (err) return res.status(500).json({ msg: err.message });
    }
};

module.exports = uploadImg;
