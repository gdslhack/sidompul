import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [token, setToken] = useState('');

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
            version: '6.1.1',
            'user-agent': 'okhttp/4.9.3',
            Host: 'srg-txl-login-controller-service.ext.dp.xl.co.id'
          }
        }
      );
      console.log(response.data);
    } catch (error) {
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
            version: '6.1.1',
            'user-agent': 'okhttp/4.9.3',
            Host: 'srg-txl-login-controller-service.ext.dp.xl.co.id'
          }
        }
      );
      setToken(response.data.token); // Simpan token dari response
      // Redirect ke halaman cek kuota atau tampilkan form cek kuota
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleRequestOtp}>
        <input
          type="email"
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
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="OTP"
          required
        />
        <button type="submit">Login</button>
      </form>
      {token && <p>Token: {token}</p>}
    </div>
  );
}
