// components/TransferComponent.js

import React, { useState } from 'react';
import TransferService from '../services/TransferService';

const TransferComponent = () => {
  const [beneficiaryAccount, setBeneficiaryAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleTransfer = async () => {
    try {
      const parsedAmount = parseFloat(amount);

      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        throw new Error('Amount must be a valid positive number.');
      }

      await TransferService.transferFunds(beneficiaryAccount, parsedAmount, description);
      // Reset the form after a successful transfer
      setBeneficiaryAccount('');
      setAmount('');
      setDescription('');
      setErrorMessage('');
      // Optionally, you can show a success message or redirect the user
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred during the transfer.');
      // Handle the error, show error message to the user, etc.
    }
  };

  return (
    <div>
      <h2>Transfer Funds</h2>
      <div>
        <label>Beneficiary Account:</label>
        <input
          type="text"
          value={beneficiaryAccount}
          onChange={(e) => setBeneficiaryAccount(e.target.value)}
        />
      </div>
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
      <button onClick={handleTransfer}>Transfer Funds</button>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  );
};

export default TransferComponent;
