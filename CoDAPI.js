require('dotenv').config();
const axios = require('axios');
const loginHelpers = require('./utils/loginHelpers');

const CoDAPI = () => {
  const session = {
    isLoggedIn: false,
    headers: {
      Cookie: '',
    },
  };

  const login = async (username, password) => {
    try {
      const csrf = await loginHelpers.getCSRF();
      session.headers.Cookie = await loginHelpers.getAuthCookies(
        username,
        password,
        csrf
      );
      session.isLoggedIn = true;
    } catch (err) {
      session.errorMessage = err;
    }
  };

  const getSessionInfo = () => {
    return session;
  };

  const searchPlayer = async (platform, username) => {
    const response = await axios(
      `https://my.callofduty.com/api/papi-client/crm/cod/v2/platform/${platform}/username/${username}/search`,
      { headers: session.headers }
    );

    return response.data;
  };

  return { login, getSessionInfo, searchPlayer };
};

module.exports = CoDAPI;
