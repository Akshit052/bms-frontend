// components/ViewStatementComponent.jsx

import React, { useState } from 'react';
import ViewStatementService from '../services/ViewStatementService';

const ViewStatementComponent = () => {
  const handleClick = async () => {
    try {
      const response = await ViewStatementService.viewStatement();
      console.log(response); // Display or handle the transaction statement accordingly
    } catch (error) {
      console.error('Error fetching transaction statement:', error);
      // Handle specific error messages and display them to the user as needed
    }
  };

  return (
    <div>
      <h2>View Transaction Statement</h2>
      <button onClick={handleClick}>View Statement</button>
    </div>
  );
};

export default ViewStatementComponent;
