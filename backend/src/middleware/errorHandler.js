/**
 * Centralized error handling middleware
 * @param {Error} err - Error object
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 * @param {Function} next - Express next function
 */
export function errorHandler(err, req, res, next) {
  console.error("Error:", err);

  // Default error status and message
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}

/**
 * Handle 404 not found errors
 */
export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
}
