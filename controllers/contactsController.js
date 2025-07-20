const Contact = require('../models/contacts.js');
const logger = require('../logger');
const { sendErrorResponse } = require('../utils/errorResponse');
const { sendMail, contactFormEmailTemplate } = require('../utils/mailer');

// Submit a new contact form
exports.submitForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    // Validation moved to middleware
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Send notification email to site owner
    try {
      await sendMail({
        to: process.env.SMTP_MAIL,
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: contactFormEmailTemplate({ name, email, message })
      });
      logger.info('Contact notification email sent');
    } catch (mailErr) {
      logger.error('Failed to send contact notification email: ' + mailErr.message);
    }

    res.status(201).json({ 
      success: true,
      message: 'Contact form submitted successfully' 
    });
  } catch (error) {
    logger.error(error.message);
    sendErrorResponse(res, 500, 'Internal server error', error);
  }
};

// Get a single contact by ID
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return sendErrorResponse(res, 404, 'Contact not found');
    }
    res.status(200).json({
      success: true,
      message: 'Contact retrieved successfully',
      data: contact,
    });
  } catch (error) {
    logger.error(error.message);
    sendErrorResponse(res, 500, 'Internal Server Error', error);
  }
};

// Get all contacts with pagination
exports.getContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const ITEMS_PER_PAGE = 10;
    const { search, email } = req.query;
    const query = {};
    if (search) {
      // Search in name, email, or message (case-insensitive)
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
      ];
    }
    if (email) {
      query.email = email;
    }
    const [totalContacts, contacts] = await Promise.all([
      Contact.countDocuments(query),
      Contact.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE),
    ]);
    res.status(200).json({
      success: true,
      message: 'Contacts retrieved successfully',
      data: contacts,
      count: contacts.length,
      totalContacts,
      totalPages: Math.ceil(totalContacts / ITEMS_PER_PAGE),
      currentPage: page
    });
  } catch (error) {
    logger.error(error.message);
    sendErrorResponse(res, 500, 'Internal Server Error', error);
  }
};

// Delete a contact by ID
exports.deleteContact = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return sendErrorResponse(res, 404, 'Contact not found');
    }
    res.status(200).json({ 
      success: true, 
      message: 'Contact deleted successfully' 
    });
  } catch (error) {
    logger.error(error.message);
    sendErrorResponse(res, 500, 'Internal Server Error', error);
  }
};
