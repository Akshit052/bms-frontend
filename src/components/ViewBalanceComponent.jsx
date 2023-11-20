// components/ViewBalanceComponent.js

import React, { useState, useEffect } from 'react';
import ViewBalanceService from '../services/ViewBalanceService';

const ViewBalanceComponent = () => {
  const [customerDetails, setCustomerDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch and display initial customer details when the component mounts
    fetchCustomerDetails();
  }, []);

  const fetchCustomerDetails = async () => {
    try {
      const response = await ViewBalanceService.viewCustomerDetails();
      setCustomerDetails(response.data);
      setErrorMessage('');
    } catch (error) {
      setCustomerDetails(null);
      setErrorMessage(error.message || 'An error occurred while fetching customer details.');
    }
  };

  return (
    <div>
      <h2>View Balance</h2>
      <button onClick={fetchCustomerDetails}>View Balance</button>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      {customerDetails && (
        <div>
          <h3>Customer Details</h3>
          <p>Account Number: {customerDetails.accountNumber}</p>
          <p>First Name: {customerDetails.firstName}</p>
          <p>Last Name: {customerDetails.lastName}</p>
          <p>Email Address: {customerDetails.emailAddress}</p>
          <p>Phone Number: {customerDetails.phoneNumber}</p>
          <p>Account Balance: {customerDetails.accountBalance}</p>
        </div>
      )}
    </div>
  );
};

export default ViewBalanceComponent;
