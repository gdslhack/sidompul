import fetch from 'node-fetch';

const imei = '354630570072013'; // Default IMEI

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
        'Accept': 'application/json',
        'Authorization': 'Basic ZGVtb2NsaWVudDpkZW1vY2xpZW50c2VjcmV0',
        'Version': '6.1.1',
        'User-Agent': 'okhttp/4.9.3',
      },
    });

    const otpData = await otpResponse.json();
    if (otpData.statusCode !== 200) {
      throw new Error(otpData.statusDescription);
    }

    // Verify OTP
    const loginResponse = await fetch(`https://srg-txl-login-controller-service.ext.dp.xl.co.id/v2/auth/email/${email}/${otp}/${imei}?force=true`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Basic ZGVtb2NsaWVudDpkZW1vY2xpZW50c2VjcmV0',
        'Version': '6.1.1',
        'User-Agent': 'okhttp/4.9.3',
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
