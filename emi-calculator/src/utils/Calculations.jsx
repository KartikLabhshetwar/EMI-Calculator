/**
 * Calculate the monthly EMI
 * @param {number} principal - The loan amount
 * @param {number} annualRate - The annual interest rate (in percentage)
 * @param {number} tenureMonths - The loan tenure in months
 * @returns {number} The monthly EMI amount
 */
export const calculateEMI = (principal, annualRate, tenureMonths) => {
    const monthlyRate = annualRate / 12 / 100;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
                (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    return Math.round(emi * 100) / 100;
  };
  
  /**
   * Calculate the total interest payable
   * @param {number} emi - The monthly EMI amount
   * @param {number} tenureMonths - The loan tenure in months
   * @param {number} principal - The loan amount
   * @returns {number} The total interest payable
   */
  export const calculateTotalInterest = (emi, tenureMonths, principal) => {
    const totalPayment = emi * tenureMonths;
    return Math.round((totalPayment - principal) * 100) / 100;
  };
  
  /**
   * Generate a monthly breakdown of the loan repayment
   * @param {number} principal - The loan amount
   * @param {number} annualRate - The annual interest rate (in percentage)
   * @param {number} tenureMonths - The loan tenure in months
   * @param {number} prepayment - The optional prepayment amount
   * @returns {Array} An array of monthly breakdown objects
   */
  export const generateMonthlyBreakdown = (principal, annualRate, tenureMonths, prepayment = 0) => {
    const monthlyRate = annualRate / 12 / 100;
    const emi = calculateEMI(principal, annualRate, tenureMonths);
    let remainingBalance = principal;
    const breakdown = [];
  
    for (let month = 1; month <= tenureMonths; month++) {
      const interestForMonth = remainingBalance * monthlyRate;
      let principalForMonth = emi - interestForMonth;
      
      // Apply prepayment
      if (prepayment > 0 && remainingBalance > prepayment) {
        principalForMonth += prepayment;
      }
  
      remainingBalance -= principalForMonth;
  
      if (remainingBalance < 0) {
        principalForMonth += remainingBalance;
        remainingBalance = 0;
      }
  
      breakdown.push({
        month,
        emiPaid: Math.round((principalForMonth + interestForMonth) * 100) / 100,
        principalPaid: Math.round(principalForMonth * 100) / 100,
        interestPaid: Math.round(interestForMonth * 100) / 100,
        remainingBalance: Math.round(remainingBalance * 100) / 100
      });
  
      if (remainingBalance === 0) break;
    }
  
    return breakdown;
  };
  
  /**
   * Calculate the impact of prepayment on the loan
   * @param {number} principal - The loan amount
   * @param {number} annualRate - The annual interest rate (in percentage)
   * @param {number} tenureMonths - The loan tenure in months
   * @param {number} prepayment - The monthly prepayment amount
   * @returns {Object} An object containing the new tenure and interest saved
   */
  export const calculatePrepaymentImpact = (principal, annualRate, tenureMonths, prepayment) => {
    const originalBreakdown = generateMonthlyBreakdown(principal, annualRate, tenureMonths);
    const prepaymentBreakdown = generateMonthlyBreakdown(principal, annualRate, tenureMonths, prepayment);
  
    const newTenure = prepaymentBreakdown.length;
    const originalTotalInterest = originalBreakdown.reduce((sum, month) => sum + month.interestPaid, 0);
    const newTotalInterest = prepaymentBreakdown.reduce((sum, month) => sum + month.interestPaid, 0);
    const interestSaved = Math.round((originalTotalInterest - newTotalInterest) * 100) / 100;
  
    return {
      newTenure,
      interestSaved
    };
};