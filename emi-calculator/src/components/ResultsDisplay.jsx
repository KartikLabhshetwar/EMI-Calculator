import { Card, ListGroup, Row, Col } from 'react-bootstrap';
import { calculateEMI, calculateTotalInterest, calculatePrepaymentImpact } from "../utils/calculations";

const ResultsDisplay = ({ loanAmount, interestRate, loanTenure, prepaymentAmount }) => {
  const emi = calculateEMI(loanAmount, interestRate, loanTenure);
  const totalInterest = calculateTotalInterest(emi, loanTenure, loanAmount);
  const totalAmount = loanAmount + totalInterest;

  const prepaymentImpact = calculatePrepaymentImpact(loanAmount, interestRate, loanTenure, prepaymentAmount);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  return (
    <Row className="mb-4">
      <Col md={prepaymentAmount > 0 ? 6 : 12}>
        <Card className="h-100 shadow-sm">
          <Card.Header as="h5" className="bg-primary text-white">Loan Summary</Card.Header>
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
          <Card className="h-100 shadow-sm">
            <Card.Header as="h5" className="bg-success text-white">Prepayment Impact</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Your current EMI:</strong> {formatCurrency(prepaymentImpact.originalEMI)}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>EMI reduced by:</strong> {formatCurrency(prepaymentImpact.emiReduction)}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Your new EMI:</strong> {formatCurrency(prepaymentImpact.newEMI)}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Your savings on interest:</strong> {formatCurrency(prepaymentImpact.interestSaved)}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      )}
    </Row>
  );
};

export default ResultsDisplay;
