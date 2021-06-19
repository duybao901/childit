const express = require('express');

const router = express.Router();
const UploadController = require('../Controllers/Uploads.Controller');

const uploadImage = require('../Middleware/upload');

router.post('/upload_avatar', uploadImage, UploadController.uploadImage);
router.post('/destroy_avatar', UploadController.destroyImage);

module.exports = router;
