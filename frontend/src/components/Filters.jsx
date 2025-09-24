import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useTheme } from '@mui/material/styles';

export default function Filters({ onChange }) {
  const theme = useTheme();
  const initialFilter = { type:'', category:'', startDate:'', endDate:'' };
  const [filter, setFilter] = useState(initialFilter);

  const inputStyle = {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    borderColor: theme.palette.divider
  };

  const handleInputChange = e => {
    setFilter(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleApply = () => {
    // Only send non-empty values to parent
    onChange(Object.fromEntries(Object.entries(filter).filter(([_, v]) => v)));
  };

  const handleReset = () => {
    setFilter(initialFilter);        // Reset form fields
    onChange({});                    // Send empty object → backend gets no query params
  };

  return (
    <div className="card shadow-sm p-3 mb-3" style={{ backgroundColor: theme.palette.background.paper }}>
      <Row className="mb-2">
        <Col md={6}>
          <Form.Label style={{ color: theme.palette.text.primary }}>Type</Form.Label>
          <Form.Select
            name="type"
            value={filter.type}
            onChange={handleInputChange}
            style={inputStyle}
          >
            <option value="">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Form.Select>
        </Col>
        <Col md={6}>
          <Form.Label style={{ color: theme.palette.text.primary }}>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={filter.category}
            onChange={handleInputChange}
            placeholder="Category"
            style={inputStyle}
          />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col md={6}>
          <Form.Label style={{ color: theme.palette.text.primary }}>Start Date</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            value={filter.startDate}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </Col>
        <Col md={6}>
          <Form.Label style={{ color: theme.palette.text.primary }}>End Date</Form.Label>
          <Form.Control
            type="date"
            name="endDate"
            value={filter.endDate}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </Col>
      </Row>

      <Row className="mt-2">
        <Col>
          <Button variant="primary" onClick={handleApply} className="me-2">
            Apply
          </Button>
          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </Col>
      </Row>
    </div>
  );
}




