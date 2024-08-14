import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SubmitToken() {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (token) {
      localStorage.setItem('authToken', token); // Simpan token di localStorage
      router.push('/check-quotas'); // Arahkan ke halaman cek kuota
    } else {
      setError('Please enter a token');
    }
  };

  return (
    <div>
      <h1>Submit Access Token</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter access token"
          required
        />
        <button type="submit">Submit Token</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
