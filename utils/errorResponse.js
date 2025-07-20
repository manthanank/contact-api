function sendErrorResponse(res, status, message, error = null) {
  const response = {
    success: false,
    message,
  };
  if (error && error.message) {
    response.error = error.message;
  }
  res.status(status).json(response);
}

module.exports = { sendErrorResponse }; 