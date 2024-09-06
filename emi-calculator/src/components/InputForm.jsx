import { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';

const InputForm = ({ onSubmit, isDarkMode }) => {
  const [formData, setFormData] = useState({
    loanAmount: '',
    interestRate: '',
    loanTenure: '',
    tenureType: 'months',
    prepaymentAmount: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.loanAmount || formData.loanAmount <= 0) {
      newErrors.loanAmount = 'Please enter a valid loan amount';
    }
    if (!formData.interestRate || formData.interestRate <= 0 || formData.interestRate > 100) {
      newErrors.interestRate = 'Please enter a valid interest rate (0-100)';
    }
    if (!formData.loanTenure || formData.loanTenure <= 0) {
      newErrors.loanTenure = 'Please enter a valid loan tenure';
    }
    if (formData.prepaymentAmount && formData.prepaymentAmount < 0) {
      newErrors.prepaymentAmount = 'Prepayment amount cannot be negative';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Loan Amount</Form.Label>
            <Form.Control
              type="number"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              isInvalid={!!errors.loanAmount}
            />
            <Form.Control.Feedback type="invalid">
              {errors.loanAmount}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Interest Rate (%)</Form.Label>
            <Form.Control
              type="number"
              name="interestRate"
              value={formData.interestRate}
              onChange={handleChange}
              isInvalid={!!errors.interestRate}
            />
            <Form.Control.Feedback type="invalid">
              {errors.interestRate}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Loan Tenure</Form.Label>
            <Form.Control
              type="number"
              name="loanTenure"
              value={formData.loanTenure}
              onChange={handleChange}
              isInvalid={!!errors.loanTenure}
            />
            <Form.Control.Feedback type="invalid">
              {errors.loanTenure}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Tenure Type</Form.Label>
            <Form.Select
              value={formData.tenureType}
              onChange={(e) => setFormData({ ...formData, tenureType: e.target.value })}
              className={isDarkMode ? 'bg-dark text-white' : ''}
            >
              <option value="months">Months</option>
              <option value="years">Years</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3">
        <Form.Label>Prepayment Amount (Optional)</Form.Label>
        <Form.Control
          type="number"
          name="prepaymentAmount"
          value={formData.prepaymentAmount}
          onChange={handleChange}
          isInvalid={!!errors.prepaymentAmount}
        />
        <Form.Control.Feedback type="invalid">
          {errors.prepaymentAmount}
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant={isDarkMode ? "outline-light" : "primary"} type="submit">
        Calculate EMI
      </Button>
    </Form>
  );
};

export default InputForm;
