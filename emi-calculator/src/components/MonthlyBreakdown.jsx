import { useState } from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import { generateMonthlyBreakdown } from '../utils/calculations';

const MonthlyBreakdown = ({ loanAmount, interestRate, loanTenure, prepaymentAmount, isDarkMode }) => {
  const [showAll, setShowAll] = useState(false);
  const breakdown = generateMonthlyBreakdown(loanAmount, interestRate, loanTenure, prepaymentAmount);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  const displayedBreakdown = showAll ? breakdown : breakdown.slice(0, 12);

  return (
    <Card className={`mt-4 shadow-sm ${isDarkMode ? 'bg-dark text-white' : ''}`}>
      <Card.Header as="h5" className={isDarkMode ? 'bg-secondary text-white' : 'bg-info text-white'}>Monthly Breakdown</Card.Header>
      <Card.Body>
        <div className="table-responsive">
          <Table striped bordered hover size="sm" className={`monthly-breakdown-table ${isDarkMode ? 'table-dark' : ''}`}>
            <thead className={isDarkMode ? 'thead-dark' : ''}>
              <tr>
                <th>Month</th>
                <th>EMI</th>
                <th>Principal</th>
                <th>Interest</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {displayedBreakdown.map((month) => (
                <tr key={month.month}>
                  <td>{month.month}</td>
                  <td>{formatCurrency(month.emiPaid)}</td>
                  <td>{formatCurrency(month.principalPaid)}</td>
                  <td>{formatCurrency(month.interestPaid)}</td>
                  <td>{formatCurrency(month.remainingBalance)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        {breakdown.length > 12 && (
          <Button variant={isDarkMode ? "outline-light" : "outline-primary"} onClick={() => setShowAll(!showAll)} className="mt-3">
            {showAll ? 'Show Less' : 'Show All'}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default MonthlyBreakdown;