/**
 * Validate request body has required fields
 * @param {Array<string>} requiredFields - Array of required field names
 * @returns {Function} Middleware function
 */
export function validateRequired(requiredFields) {
  return (req, res, next) => {
    const missing = [];

    for (const field of requiredFields) {
      if (req.body[field] === undefined || req.body[field] === null) {
        missing.push(field);
      }
    }

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missing.join(", ")}`,
      });
    }

    next();
  };
}

/**
 * Validate numeric fields are positive
 * @param {Array<string>} numericFields - Array of field names that should be positive numbers
 * @returns {Function} Middleware function
 */
export function validatePositive(numericFields) {
  return (req, res, next) => {
    const invalid = [];

    for (const field of numericFields) {
      const value = req.body[field];
      if (value !== undefined && value !== null && Number(value) <= 0) {
        invalid.push(field);
      }
    }

    if (invalid.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Fields must be positive numbers: ${invalid.join(", ")}`,
      });
    }

    next();
  };
}
