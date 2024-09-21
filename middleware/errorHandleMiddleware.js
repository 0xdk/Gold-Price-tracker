function errorHandler(err, req, res, next) {
  const { status, message, isOperational } = err;

  // Default to a 500 status if not set
  const statusCode = status || 500;
  const errorMessage = message || 'Internal Server Error';

  // Log only non-operational errors (unexpected issues)
  if (!isOperational) {
    console.error('Error:', err);
  }

  res
    .status(statusCode)
    .render('error', { message: errorMessage, status: statusCode });
}

module.exports = errorHandler;
