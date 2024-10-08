import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Home() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://srg-txl-login-controller-service.ext.dp.xl.co.id/v2/auth/email/${email}/`,
        null,
        {
          headers: {
            Accept: 'application/json',
            authorization: 'Basic ZGVtb2NsaWVudDpkZW1vY2xpZW50c2VjcmV0',
            version: '6.1.1'
          }
        }
      );
      console.log('OTP requested:', response.data);
      setError('');
    } catch (error) {
      setError('Error requesting OTP');
      console.error('Error requesting OTP:', error);
    }
  };

  const handleLogin = async (e) => {
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
          setToken(accessToken); // Update token state
          localStorage.setItem('authToken', accessToken); // Save token to localStorage
          router.push('/check-quotas'); // Navigate to check-quotas page
        } else {
          setError('Failed to receive access token');
        }
      } else {
        setError('Failed to login with OTP');
      }
    } catch (error) {
      setError('An error occurred while logging in');
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleRequestOtp}>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <button type="submit">Request OTP</button>
      </form>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          id="otp"
          name="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="OTP"
          required
        />
        <button type="submit">Login</button>
      </form>
      {token && <p>Token: {token}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
