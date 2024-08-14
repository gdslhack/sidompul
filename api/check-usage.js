import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, otp, nomerHp } = req.body;

  if (!email || !otp || !nomerHp) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const imei = '354630570072013'; // Default IMEI

  try {
    // Verify OTP to get access token
    const otpResponse = await fetch(`https://srg-txl-login-controller-service.ext.dp.xl.co.id/v2/auth/email/${email}/${otp}/${imei}?force=true`, {
      method: 'GET',
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

    const accessToken = otpData.result.data.accessToken;

    // Check Data Usage
    const usageResponse = await fetch(`https://srg-txl-utility-service.ext.dp.xl.co.id/v4/package/check/${nomerHp}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Version': '6.1.1',
        'User-Agent': 'okhttp/4.9.3',
      },
    });

    const usageData = await usageResponse.json();
    if (usageData.statusCode !== 200) {
      throw new Error(usageData.statusDescription);
    }

    // Format and return the response
    const formattedData = {
      packageName: usageData.result.data.packageInfo[2]?.packages?.name,
      expDate: usageData.result.data.packageInfo[2]?.packages?.expDate,
      bname: usageData.result.data.packageInfo[2]?.benefits?.find(b => b.bname === 'Unlimited')?.bname,
      quota: usageData.result.data.packageInfo[2]?.benefits?.find(b => b.bname === 'Unlimited')?.quota,
      remaining: usageData.result.data.packageInfo[2]?.benefits?.find(b => b.bname === 'Unlimited')?.remaining,
    };

    res.status(200).json(formattedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
