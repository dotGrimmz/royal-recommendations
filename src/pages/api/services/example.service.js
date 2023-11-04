import axios from "axios";
// or import your headers from wherever it is stored
const CLIENT_ID = "h1xgwhjvma1rvd46q2qwphbozrm58u";
const CLIENT_SECRET = "eorcmduiaee82df9u8uhzfyuobczzb";

export const useExampleService = () => {
  const getAccessToken = async () => {
    let accessToken = null;
    let tokenExpiryTime = 0;

    try {
      if (!accessToken || Date.now() >= tokenExpiryTime) {
        const response = await axios.post(
          `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`
        );

        accessToken = response.data.access_token;
        tokenExpiryTime = response.data.expires_in * 1000;
      }

      return accessToken; // valid for 60 days
    } catch (err) {
      throw err;
    }
  };

  const callIGDB = async (url, query) => {
    const token = await getAccessToken();
    let responseDestructured;
    if (token) {
      const tokenType = `Bearer ${token}`;
      const headers = {
        Accept: "application/json",
        "Client-ID": CLIENT_ID,
        Authorization: tokenType,
      };
      const response = await axios.post(url, query, { headers: headers });
      responseDestructured = [...response.data];
      return responseDestructured;
    }
  };

  const fetchGenres = async () => {
    const url = "https://api.igdb.com/v4/genres/";
    const query =
      "fields name; where id = (4, 5, 7, 8, 9, 12, 13, 14, 15, 24, 31, 33, 36); limit 13;";
    return await callIGDB(url, query);
  };

  const fetchAgeRatings = () => {
    const RatingsEnum = {
      8: "E",
      9: "E10",
      10: "T",
      11: "M",
    };
    const url = "https://api.igdb.com/v4/age_ratings/";
    const query = "fields rating; where category = 1;";
    return;
  };

  const buildGameObj = async () => {
    return await Promise.all([fetchGenres()]);

    //build the object based on each index of result
  };

  return { buildGameObj };
};
