import axios from "axios";
// or import your headers from wherever it is stored
const CLIENT_ID = "h1xgwhjvma1rvd46q2qwphbozrm58u";
const CLIENT_SECRET = "eorcmduiaee82df9u8uhzfyuobczzb";

export const useFetchDataService = () => {
  // get token
  const getAccessToken = async () => {
    let accessToken = null;

    try {
      if (!accessToken) {
        const response = await axios.post(
          `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`
        );

        accessToken = response.data.access_token;
      }
      return accessToken;
    } catch (err) {
      throw err;
    }
  };

  // make calls to API to gather necessary fields
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
    try {
      return await callIGDB(url, query);
    } catch (err) {
      throw err;
    }
  };

  const fetchAgeRatings = async () => {
    const RatingsEnum = {
      8: "E",
      9: "E10",
      10: "T",
      11: "M",
    };
    // category 1 = ESRB rating system
    const url = "https://api.igdb.com/v4/age_ratings/";
    const query = "fields rating; where category = 1;";

    try {
      return await callIGDB(url, query);
    } catch (err) {
      throw err;
    }
  };

  const fetchMultiPlayerMode = async () => {
    const url = "https://api.igdb.com/v4/game_modes/";
    const query = "fields name; where id = (1, 2);";
    // 1 = single, 2 = multi

    try {
      return await callIGDB(url, query);
    } catch (err) {
      throw err;
    }
  };

  const fetchPlatforms = async () => {
    const url = "https://api.igdb.com/v4/platforms/";
    const query =
      'fields name; where name ~ *"microsoft"* | name ~ *"nintendo"* | name ~ *"playstation"* | name ~ *"xbox"*; sort id asc; limit 100;';

    try {
      const platforms = await callIGDB(url, query);

      // to hold each platform type
      let nintendo = [];
      let sony = [];
      let pc = [];
      let microsoft = [];

      // map the platforms to their respective arrays
      platforms.map((obj) => {
        if (obj.name.includes("Nintendo")) {
          nintendo.push(obj.id);
        } else if (obj.name.includes("PlayStation")) {
          sony.push(obj.id);
        } else if (obj.name.includes("PC")) {
          pc.push(obj.id);
        } else if (obj.name.includes("Xbox")) {
          microsoft.push(obj.id);
        }
      });

      let platformObjs = [
        { name: "PC", id: 1 },
        { name: "Sony Consoles", id: 2 },
        { name: "Microsoft Consoles", id: 3 },
        { name: "Nintendo Consoles", id: 4 },
      ];

      return platformObjs;
    } catch (err) {
      throw err;
    }
  };

  const buildGameObj = async () => {
    const [genres, platforms, multiPlayers, ageRating] = await Promise.all([
      fetchGenres(),
      fetchPlatforms(),
      fetchMultiPlayerMode(),
      fetchAgeRatings(),
    ]);

    return {
      genres: genres,
      platforms: platforms,
      multiPlayers: multiPlayers,
      ageRating: ageRating,
    };

    //build the object based on each index of result
  };

  return { buildGameObj };
};
