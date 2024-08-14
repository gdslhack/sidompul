import { useState } from 'react';
import { checkQuota } from '../utils/api';

export default function CheckQuotas() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [quota, setQuota] = useState('');
  const [token, setToken] = useState(''); // Tambahkan state untuk token

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await checkQuota(phoneNumber, token); // Kirimkan token
      setQuota(JSON.stringify(response));
    } catch (error) {
      setQuota('An error occurred while checking quota');
      console.error(error);
    }
  };

  // Tambahkan input untuk token jika diperlukan
  return (
    <div>
      <h1>Check Quota</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          required
        />
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Token"
          required
        />
        <button type="submit">Check Quota</button>
      </form>
      {quota && <pre>{quota}</pre>}
    </div>
  );
}
