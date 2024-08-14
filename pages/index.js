import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      alert('Please enter your email.');
      return;
    }

    router.push(`/otp?email=${encodeURIComponent(email)}`);
  };

  return (
    <div>
      <h1>Masukkan Email</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Kirim OTP</button>
      </form>
    </div>
  );
}
