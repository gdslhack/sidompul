import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Check() {
  const [nomerHp, setNomerHp] = useState('');
  const [response, setResponse] = useState('');
  const router = useRouter();
  const { email, otp } = router.query;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nomerHp) {
      alert('Please enter your phone number.');
      return;
    }

    const response = await fetch('/api/check-usage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, nomerHp }),
    });

    const data = await response.json();
    if (response.ok) {
      setResponse(JSON.stringify(data, null, 2));
    } else {
      setResponse(`Error: ${data.error}`);
    }
  };

  return (
    <div>
      <h1>Masukkan Nomor HP</h1>
      <form onSubmit={handleSubmit}>
        <label>Nomor HP:</label>
        <input
          type="text"
          value={nomerHp}
          onChange={(e) => setNomerHp(e.target.value)}
          required
        />
        <button type="submit">Cek Kuota</button>
      </form>
      <pre>{response}</pre>
    </div>
  );
}
