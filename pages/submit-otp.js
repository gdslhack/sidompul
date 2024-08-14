import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function SubmitOtp() {
  const [otp, setOtp] = useState('');
  const router = useRouter();
  const { email } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://srg-txl-login-controller-service.ext.dp.xl.co.id/v2/auth/email/${email}/${otp}/354630570072013?force=true`,
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
        // Ambil token jika ada dalam respons
        const token = response.data.token; // Pastikan token disediakan oleh respons
        if (token) {
          localStorage.setItem('authToken', token); // Simpan token di localStorage
        }
        router.push('/check-quotas'); // Arahkan ke halaman cek kuota
      } else {
        alert('Failed to submit OTP');
      }
    } catch (error) {
      alert('An error occurred while submitting OTP');
      console.error(error);
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
          placeholder="Enter OTP"
        />
        <button type="submit">Submit OTP</button>
      </form>
    </div>
  );
}
