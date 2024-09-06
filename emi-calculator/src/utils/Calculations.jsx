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
   * @param {number} prepaymentAmount - The optional prepayment amount
   * @returns {Array} An array of monthly breakdown objects
   */
  export const generateMonthlyBreakdown = (principal, annualRate, tenureMonths, prepaymentAmount = 0) => {
    const monthlyRate = annualRate / 12 / 100;
    let remainingBalance = principal;
    const originalEMI = calculateEMI(principal, annualRate, tenureMonths);
    const newEMI = calculateEMI(principal - prepaymentAmount, annualRate, tenureMonths);
    const breakdown = [];

    for (let month = 1; month <= tenureMonths; month++) {
      const interestForMonth = remainingBalance * monthlyRate;
      let principalForMonth, emiForMonth;

      if (month === 1) {
        principalForMonth = originalEMI - interestForMonth + prepaymentAmount;
        emiForMonth = originalEMI + prepaymentAmount;
      } else {
        principalForMonth = newEMI - interestForMonth;
        emiForMonth = newEMI;
      }

      remainingBalance -= principalForMonth;

      if (remainingBalance < 0) {
        principalForMonth += remainingBalance;
        emiForMonth += remainingBalance;
        remainingBalance = 0;
      }

      breakdown.push({
        month,
        emiPaid: Math.round(emiForMonth * 100) / 100,
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
   * @returns {Object} An object containing the new EMI and interest saved
   */
  export const calculatePrepaymentImpact = (principal, annualRate, tenureMonths, prepayment) => {
    const originalEMI = calculateEMI(principal, annualRate, tenureMonths);
  
    // Calculate new principal after prepayment
    const newPrincipal = principal - prepayment;
  
    // Calculate new EMI based on the reduced principal
    const newEMI = calculateEMI(newPrincipal, annualRate, tenureMonths);
  
    const emiReduction = originalEMI - newEMI;
  
    // Calculate total interest for original loan
    const originalTotalInterest = calculateTotalInterest(originalEMI, tenureMonths, principal);
  
    // Calculate total interest for new loan after prepayment
    const newTotalInterest = calculateTotalInterest(newEMI, tenureMonths, newPrincipal);
  
    const interestSaved = originalTotalInterest - newTotalInterest;

    return {
      originalEMI: Math.round(originalEMI),
      newEMI: Math.round(newEMI),
      emiReduction: Math.round(emiReduction),
      interestSaved: Math.round(interestSaved)
    };
  };