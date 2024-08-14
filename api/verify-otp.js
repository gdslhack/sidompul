import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Verify OTP
    const response = await fetch(`https://srg-txl-login-controller-service.ext.dp.xl.co.id/v4/auth/email/${email}/${otp}/000000000000000`, {
      method: 'GET',
      headers: {
        'x-dynatrace': 'MT_3_2_763403741_15-0_a5734da2-0ecb-4c8d-8d21-b008aeec4733_30_456_73',
        'accept': 'application/json',
        'authorization': 'Basic ZGVtb2NsaWVudDpkZW1vY2xpZW50c2VjcmV0',
        'language': 'en',
        'version': '4.1.2',
        'user-agent': 'okhttp/3.12.1',
      },
    });

    const data = await response.json();

    if (data.statusCode !== 200) {
      throw new Error(data.statusDescription);
    }

    const accessToken = data.result.data.accessToken;
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
