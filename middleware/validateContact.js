const { sendErrorResponse } = require('../utils/errorResponse');

function validateContact(req, res, next) {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return sendErrorResponse(res, 400, 'Name, email, and message are required fields');
  }
  // Simple email regex
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return sendErrorResponse(res, 400, 'Please provide a valid email address');
  }
  next();
}

module.exports = { validateContact }; 