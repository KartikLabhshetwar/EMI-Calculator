import { Card, ListGroup, Row, Col } from 'react-bootstrap';
import { calculateEMI, calculateTotalInterest, calculatePrepaymentImpact } from '../utils/Calculations';

const ResultsDisplay = ({ loanAmount, interestRate, loanTenure, prepaymentAmount }) => {
  const emi = calculateEMI(loanAmount, interestRate, loanTenure);
  const totalInterest = calculateTotalInterest(emi, loanTenure, loanAmount);
  const totalAmount = loanAmount + totalInterest;

  const prepaymentImpact = calculatePrepaymentImpact(loanAmount, interestRate, loanTenure, prepaymentAmount);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  return (
    <Row className="mt-4">
      <Col md={6}>
        <Card>
          <Card.Header as="h5">Loan Summary</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Monthly EMI:</strong> {formatCurrency(emi)}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Total Interest Payable:</strong> {formatCurrency(totalInterest)}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Total Amount Payable:</strong> {formatCurrency(totalAmount)}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
      {prepaymentAmount > 0 && (
        <Col md={6}>
          <Card>
            <Card.Header as="h5">Prepayment Impact</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>New Loan Tenure:</strong> {prepaymentImpact.newTenure} months
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Tenure Reduced:</strong> {loanTenure - prepaymentImpact.newTenure} months
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Interest Saved:</strong> {formatCurrency(prepaymentImpact.interestSaved)}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      )}
    </Row>
  );
};

export default ResultsDisplay;