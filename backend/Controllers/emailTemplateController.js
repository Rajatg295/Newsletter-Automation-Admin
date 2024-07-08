const multer = require('multer');
const path = require('path');
const EmailTemplate = require('../Models/EmailTemplate');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'CKuploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

exports.createTemplate = async (req, res) => {
  try {
    const { templateName, body } = req.body;
    const newTemplate = new EmailTemplate({ templateName, body });
    await newTemplate.save();
    res.status(201).json(newTemplate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.uploadImage = upload.single('upload');

exports.handleImageUpload = (req, res) => {
  if (req.file) {
    res.status(200).json({
      uploaded: true,
      url: `http://localhost:5000/CKuploads/${req.file.filename}`,
    });
  } else {
    res.status(400).json({ uploaded: false, error: 'File upload failed' });
  }
};

exports.getTemplates = async (req, res) => {
  try {
    const templates = await EmailTemplate.find();
    res.status(200).json(templates);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTemplateById = async (req, res) => {
  try {
    const template = await EmailTemplate.findById(req.params.id);
    if (!template) return res.status(404).json({ message: 'Template not found' });
    res.status(200).json(template);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
