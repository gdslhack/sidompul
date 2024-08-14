import { useState, useEffect } from 'react';
import { checkQuota } from '../utils/api';

export default function CheckQuotas() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [quota, setQuota] = useState('');
  const [token, setToken] = useState(''); // Ambil token dari state global, context, atau local storage

  useEffect(() => {
    // Ambil token dari storage atau context
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await checkQuota(phoneNumber, token);
      setQuota(JSON.stringify(response));
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
          placeholder="Phone Number"
          required
        />
        <button type="submit">Check Quota</button>
      </form>
      {quota && <pre>{quota}</pre>}
    </div>
  );
}
