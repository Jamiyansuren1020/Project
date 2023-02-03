import axios from "axios";
const qs = require("qs");

const REDIRECT_URI = "http://localhost:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

const CLIENT_ID = "4676e5f5432c440392e197e99f7af324";
const CLIENT_SECRET = "2bb7ce91c74040bc9f8d19f19fda2f5b";

export const getToken = async () => {
  try {
    const tokenRes = await axios.post(
      "https://accounts.spotify.com/api/token",
      qs.stringify({
        grant_type: "client_credentials",
      }),
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: CLIENT_ID,
          password: CLIENT_SECRET,
        },
      }
    );
    const accessToken = tokenRes.data.access_token;
    localStorage.setItem('accessToken', accessToken)
    window.location.reload();
    return accessToken;
  } catch {
    return null;
  }
};
