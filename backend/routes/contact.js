const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Create transporter dynamically to read fresh env vars
const getTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const transporter = getTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Contact: ${subject}`,
      html: `<h3>New Message</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Subject:</strong> ${subject}</p>
<p><strong>Message:</strong> ${message}</p>`
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to send email' });
      }
      res.json({ success: true, message: 'Message sent successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
