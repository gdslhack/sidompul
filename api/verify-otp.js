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
    // Request OTP
    const otpResponse = await fetch(`https://srg-txl-login-controller-service.ext.dp.xl.co.id/v2/auth/email/${email}/`, {
      method: 'POST',
      headers: {
        'x-dynatrace': 'MT_3_2_763403741_15-0_a5734da2-0ecb-4c8d-8d21-b008aeec4733_30_456_73',
        'accept': 'application/json',
        'authorization': 'Basic ZGVtb2NsaWVudDpkZW1vY2xpZW50c2VjcmV0',
        'language': 'en',
        'version': '4.1.2',
        'user-agent': 'okhttp/3.12.1',
      },
    });

    const otpData = await otpResponse.json();
    if (otpData.statusCode !== 200) {
      throw new Error(otpData.statusDescription);
    }

    // Verify OTP
    const loginResponse = await fetch(`https://srg-txl-login-controller-service.ext.dp.xl.co.id/v2/auth/email/${email}/OTP/${otp}/354630570072013?force=true`, {
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

    const loginData = await loginResponse.json();
    if (loginData.statusCode !== 200) {
      throw new Error(loginData.statusDescription);
    }

    const accessToken = loginData.result.data.accessToken;
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
