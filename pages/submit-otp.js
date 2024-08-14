import { useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '../utils/api';

export default function SubmitOtp() {
  const [otp, setOtp] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = router.query;
    const response = await login(email, otp);
    if (response.statusCode === 200) {
      router.push('/check-quotas');
    } else {
      alert('Failed to submit OTP');
    }
  };

  return (
    <div>
      <h1>Submit OTP</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit">Submit OTP</button>
      </form>
    </div>
  );
}
