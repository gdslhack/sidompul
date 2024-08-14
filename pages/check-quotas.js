import { useState } from 'react';
import axios from 'axios';

export default function CheckQuotas() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [quota, setQuota] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://srg-txl-utility-service.ext.dp.xl.co.id/v4/package/check/${phoneNumber}`
      );
      setQuota(JSON.stringify(response.data));
    } catch (error) {
      setQuota('An error occurred while checking quota');
      console.error(error);
    }
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
