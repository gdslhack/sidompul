import axios from 'axios';

// Endpoint untuk request OTP
export const requestOtp = async (email) => {
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
  return response.data;
};

// Endpoint untuk login dengan OTP
export const login = async (email, otp) => {
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
  return response.data;
};

// Endpoint untuk cek kuota
export const checkQuota = async (phoneNumber, token) => {
  const response = await axios.get(
    `https://srg-txl-utility-service.ext.dp.xl.co.id/v1/common/prefix/${phoneNumber}`,
    {
      headers: {
        Authorization: `Bearer ${token}` // Tambahkan header otentikasi jika diperlukan
      }
    }
  );
  return response.data;
};
