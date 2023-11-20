// components/WithdrawComponent.js

import React, { useState } from 'react';
import WithdrawService from '../services/WithdrawService';

const WithdrawComponent = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleWithdraw = async () => {
    try {
      const parsedAmount = parseFloat(amount);

      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        throw new Error('Amount must be a valid positive number.');
      }

      await WithdrawService.withdrawFunds(parsedAmount, description);
      // Reset the form after a successful withdrawal
      setAmount('');
      setDescription('');
      setErrorMessage('');
      // Optionally, you can show a success message or redirect the user
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred during the withdrawal.');
      // Handle the error, show error message to the user, etc.
    }
  };

  return (
    <div>
      <h2>Withdraw</h2>
      <div>
        <label>Amount:</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button onClick={handleWithdraw}>Withdraw</button>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  );
};

export default WithdrawComponent;
