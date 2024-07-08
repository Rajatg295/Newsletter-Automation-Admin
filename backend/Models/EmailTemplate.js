const mongoose = require('mongoose');

const EmailTemplateSchema = new mongoose.Schema({
  templateName: { type: String, required: true },
  body: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('EmailTemplate', EmailTemplateSchema);
