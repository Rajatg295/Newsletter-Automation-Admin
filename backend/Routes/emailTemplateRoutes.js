const express = require('express');
const router = express.Router();
const emailTemplateController = require('../Controllers/emailTemplateController');

router.post('/templates', emailTemplateController.createTemplate);
router.get('/templates', emailTemplateController.getTemplates);
router.get('/templates/:id', emailTemplateController.getTemplateById);
router.post('/upload', emailTemplateController.uploadImage, emailTemplateController.handleImageUpload);

module.exports = router;
