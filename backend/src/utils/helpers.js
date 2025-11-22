/**
 * Calculate difference in months between two dates
 * @param {Date|string} startDate - Starting date
 * @param {Date|string} endDate - Ending date
 * @returns {number} Number of months (rounded up if end date passes start date's day)
 */
export function diffMonths(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  // If day in end date is >= start date's day, count it as a full month
  if (end.getDate() >= start.getDate()) {
    months += 1;
  }

  if (months < 0) months = 0;
  return months;
}

/**
 * Calculate interest for a deposito account
 * @param {number} balance - Account balance
 * @param {number} yearlyReturn - Yearly return percentage (e.g., 3 for 3%)
 * @param {number} months - Number of months
 * @returns {Object} Interest calculation details
 */
export function calculateInterest(balance, yearlyReturn, months) {
  const monthlyReturn = yearlyReturn / 12 / 100; // Convert to decimal monthly rate
  const interest = balance * months * monthlyReturn;
  const endingBalance = balance + interest;

  return {
    monthlyReturn,
    interest,
    endingBalance,
  };
}
