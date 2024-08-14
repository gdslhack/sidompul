import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Otp() {
  const [otp, setOtp] = useState('');
  const router = useRouter();
  const { email } = router.query;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!otp) {
      alert('Please enter the OTP.');
      return;
    }

    const response = await fetch('/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();
    if (response.ok) {
      router.push(`/check?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`);
    } else {
      alert(`Error: ${data.error}`);
    }
  };

  return (
    <div>
      <h1>Masukkan OTP</h1>
      <form onSubmit={handleSubmit}>
        <label>OTP:</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit">Verifikasi OTP</button>
      </form>
    </div>
  );
}
