import { useState } from 'react';
import { checkQuota } from '../utils/api';

export default function CheckQuotas() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [quota, setQuota] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await checkQuota(phoneNumber);
    setQuota(JSON.stringify(response));
  };

  return (
    <div>
      <h1>Check Quota</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <button type="submit">Check Quota</button>
      </form>
      {quota && <pre>{quota}</pre>}
    </div>
  );
}
