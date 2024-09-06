import { useState } from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import { generateMonthlyBreakdown } from '../utils/Calculations';

const MonthlyBreakdown = ({ loanAmount, interestRate, loanTenure, prepaymentAmount }) => {
  const [showAll, setShowAll] = useState(false);
  const breakdown = generateMonthlyBreakdown(loanAmount, interestRate, loanTenure, prepaymentAmount);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  const displayedBreakdown = showAll ? breakdown : breakdown.slice(0, 12);

  return (
    <Card className="mt-4">
      <Card.Header as="h5">Monthly Breakdown</Card.Header>
      <Card.Body>
        <Table striped bordered hover responsive>
          <thead>
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
        {breakdown.length > 12 && (
          <Button variant="primary" onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Show Less' : 'Show All'}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default MonthlyBreakdown;