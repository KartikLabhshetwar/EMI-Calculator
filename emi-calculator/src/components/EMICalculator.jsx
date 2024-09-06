import React, { useState, useRef } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import InputForm from './InputForm';
import ResultsDisplay from './ResultsDisplay';
import MonthlyBreakdown from './MonthlyBreakdown';
import { useTheme } from '../context/ThemeContext';

const EMICalculator = () => {
  const [calculationData, setCalculationData] = useState(null);
  const { isDarkMode, toggleTheme } = useTheme();
  const printRef = useRef();

  const handleFormSubmit = (formData) => {
    const { loanAmount, interestRate, loanTenure, tenureType, prepaymentAmount } = formData;
    const tenureInMonths = tenureType === 'years' ? loanTenure * 12 : parseInt(loanTenure);

    setCalculationData({
      loanAmount: parseFloat(loanAmount),
      interestRate: parseFloat(interestRate),
      loanTenure: tenureInMonths,
      prepaymentAmount: parseFloat(prepaymentAmount) || 0,
    });
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <Container className="my-5">
      <Card className={`shadow-sm ${isDarkMode ? 'bg-dark text-white' : ''}`}>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="mb-0">EMI Calculator</h1>
            <div>
              <Button variant={isDarkMode ? "outline-light" : "outline-dark"} onClick={toggleTheme} className="me-2">
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </Button>
              {calculationData && (
                <Button variant={isDarkMode ? "outline-light" : "outline-dark"} onClick={handlePrint}>
                  Print / Save PDF
                </Button>
              )}
            </div>
          </div>
          <Row>
            <Col lg={4}>
              <InputForm onSubmit={handleFormSubmit} isDarkMode={isDarkMode} />
            </Col>
            <Col lg={8}>
              {calculationData && (
                <div ref={printRef}>
                  <ResultsDisplay {...calculationData} isDarkMode={isDarkMode} />
                  <MonthlyBreakdown {...calculationData} isDarkMode={isDarkMode} />
                </div>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EMICalculator;
