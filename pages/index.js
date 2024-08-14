import { useState } from 'react';
import { requestOtp } from '../utils/api';
import { useRouter } from 'next/router';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await requestOtp(email);
    if (response.statusCode === 200) {
      router.push('/submit-otp');
    } else {
      setStatus('Failed to request OTP');
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
