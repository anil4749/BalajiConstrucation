const Inquiry = require('../models/Inquiry');
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

// Submit inquiry
exports.createInquiry = async (req, res) => {
  try {
    const { name, email, phone, projectInterest, message, budget, preferredContact } = req.body;
    const transporter = getTransporter();

    const inquiry = new Inquiry({
      name,
      email,
      phone,
      projectInterest,
      message,
      budget,
      preferredContact
    });

    try {
      await inquiry.save();
    } catch (dbError) {
      console.log('Database unavailable, inquiry not saved:', dbError.message);
    }

    // Send email to ADMIN (you)
    const mailOptionsAdmin = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Inquiry - ${projectInterest} from ${name}`,
      html: `
        <h2>New Inquiry Received!</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Project Interest:</strong> ${projectInterest}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Budget:</strong> ${budget} L</p>
        <p><strong>Preferred Contact:</strong> ${preferredContact}</p>
      `
    };

    // Send confirmation email to USER
    const mailOptionsUser = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Inquiry Received - Balaji Construction',
      html: `
        <h2>Thank you for your inquiry!</h2>
        <p>Dear ${name},</p>
        <p>We have received your inquiry about ${projectInterest}.</p>
        <p>Our team will contact you soon at ${phone} or ${email}.</p>
        <p>Best regards,<br>Balaji Construction Team</p>
      `
    };

    // Send both emails
    transporter.sendMail(mailOptionsAdmin, (err, info) => {
      if (err) {
        console.log('❌ Admin Email Error:', err.message);
      } else {
        console.log('✅ Admin Email Sent');
      }
    });

    transporter.sendMail(mailOptionsUser, (err, info) => {
      if (err) {
        console.log('❌ User Email Error:', err.message);
      } else {
        console.log('✅ User Email Sent to:', email);
      }
    });

    res.status(201).json({ success: true, message: 'Inquiry submitted successfully', inquiry });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all inquiries
exports.getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    console.log('Database unavailable, returning empty inquiries:', error.message);
    // Return empty array when database unavailable
    res.json([]);
  }
};
