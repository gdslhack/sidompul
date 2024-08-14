import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://srg-txl-login-controller-service.ext.dp.xl.co.id/v2/auth/email/${email}/`,
        null,
        {
          headers: {
            Accept: 'application/json',
            authorization: 'Basic ZGVtb2NsaWVudDpkZW1vY2xpZW50c2VjcmV0',
            version: '6.1.1',
            'user-agent': 'okhttp/4.9.3',
            Host: 'srg-txl-login-controller-service.ext.dp.xl.co.id'
          }
        }
      );

      if (response.data.statusCode === 200) {
        router.push(`/submit-otp?email=${encodeURIComponent(email)}`);
      } else {
        setStatus('Failed to request OTP');
      }
    } catch (error) {
      setStatus('An error occurred while requesting OTP');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Input Email</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Request OTP</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}
