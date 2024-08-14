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
            version: '6.1.1'
          }
        }
      );

      console.log('Login response:', response.data);

      if (response.data.statusCode === 200) {
        const { accessToken } = response.data.result.data;
        if (accessToken) {
          console.log('Access Token:', accessToken);
          localStorage.setItem('authToken', accessToken); // Save token to localStorage
          router.push('/check-quotas'); // Navigate to check-quotas page
        } else {
          alert('Failed to receive access token');
        }
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
          id="otp"
          name="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit">Submit OTP</button>
      </form>
    </div>
  );
}
