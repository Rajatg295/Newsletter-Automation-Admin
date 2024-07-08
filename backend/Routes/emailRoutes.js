const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const EmailTemplate = require('../Models/EmailTemplate');

router.post('/sendNow', async (req, res) => {
  const { recipient, subject, templateId } = req.body;

  if (!recipient || !subject || !templateId) {
    return res.status(400).json({ error: 'Recipient, subject, and template are required' });
  }

  try {
    const template = await EmailTemplate.findById(templateId);
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipient,
      subject: subject,
      html: template.body
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;