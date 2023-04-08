import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MyButton = ({ label, classes = '', type, handleClick, disabled = false }) => (
  <Button
    className={classes}
    variant="outline-dark"
    size="lg"
    disabled={disabled}
    type={type}
    onClick={(e) => handleClick && handleClick(e)}
  >
    {label}
  </Button>
);

export default MyButton;
