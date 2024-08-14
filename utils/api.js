import axios from 'axios';

const apiBaseUrl = 'https://srg-txl-login-controller-service.ext.dp.xl.co.id/v2/auth';

export const requestOtp = async (email) => {
  const response = await axios.post(`${apiBaseUrl}/email/${email}/`, null, {
    headers: {
      Accept: 'application/json',
      authorization: 'Basic ZGVtb2NsaWVudDpkZW1vY2xpZW50c2VjcmV0',
      version: '6.1.1',
      'user-agent': 'okhttp/4.9.3',
      Host: 'srg-txl-login-controller-service.ext.dp.xl.co.id',
    },
  });
  return response.data;
};

export const login = async (email, otp) => {
  const response = await axios.get(`${apiBaseUrl}/email/${email}/${otp}/354630570072013?force=true`, {
    headers: {
      Accept: 'application/json',
      authorization: 'Basic ZGVtb2NsaWVudDpkZW1vY2xpZW50c2VjcmV0',
      version: '6.1.1',
      'user-agent': 'okhttp/4.9.3',
      Host: 'srg-txl-login-controller-service.ext.dp.xl.co.id',
    },
  });
  return response.data;
};

export const checkQuota = async (phoneNumber) => {
  const response = await axios.get(`https://srg-txl-utility-service.ext.dp.xl.co.id/v4/package/check/${phoneNumber}`);
  return response.data;
};
