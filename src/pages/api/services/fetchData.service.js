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
      return accessToken; // valid for 60 days
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

  const fetchReleaseDate = async () => {
    // add param; maybe array of min/max range
    const url = "https://api.igdb.com/v4/release_dates/";
    const query = "fields y; where y >= 1990 & y < 1999; limit 10;";

    try {
      const response = await callIGDB(url, query);

      let releaseDates = [];
      response.map((date) => {
        releaseDates.push(date.y);
      });

      return releaseDates;
    } catch (err) {
      throw err;
    }
  };

  // we don't need game names here

  const fetchGameName = async () => {
    // build up the query string based on these fields
    // extracting ids into easily searchable format for the query string
    // format: (1, 2, 3, 4, ...)
    //const genres = await fetchGenres();
    //const platforms = await fetchPlatforms();
    //const multiPlayers = await fetchMultiPlayerMode();
    //const ageRating = await fetchAgeRatings();

    const [genres, platforms, multiPlayers, ageRating] = await Promise.all([
      fetchGenres(),
      fetchPlatforms(),
      fetchMultiPlayerMode(),
      fetchAgeRatings(),
    ]);
    //const releaseDate = await fetchReleaseDate();

    let genreIds = "(";
    let platformIds = "(";
    let multiPlayerIds = "(";
    //let releaseDateIds = "(";

    genres.map((genre) => {
      genreIds += `${genre.id}, `;
    });
    genreIds = genreIds.slice(0, -2) + ")";
    //console.log("genres: " + genreIds);

    platforms.map((platform) => {
      platformIds += `${platform.id}, `;
    });
    platformIds = platformIds.slice(0, -2) + ")";
    //console.log("platforms: " + platformIds);

    multiPlayers.map((mp) => {
      multiPlayerIds += `${mp.id}, `;
    });
    multiPlayerIds = multiPlayerIds.slice(0, -2) + ")";
    //console.log("multiplayer: " + multiPlayerIds);

    // this probbly needs to be reworked; release date should be array of 2 years, min and max
    // releaseDate.map((date) => {
    //     releaseDateIds += `${date}, `;
    // })
    // releaseDateIds = releaseDateIds.slice(0, -2) + ")";
    //console.log("release date: " + releaseDateIds);

    const url = "https://api.igdb.com/v4/games/";
    const query = `fields name; where genres.id = ${genreIds} & platforms.id = ${platformIds} & game_modes = 1 & release_dates.y > 1993 & release_dates.y < 1995; sort release_dates.y asc; limit 10;`;

    const response = await callIGDB(url, query);

    //const res = [...response];
    //console.log("response: " + JSON.stringify(response));
    //console.log(res);

    return response;
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

    //return await Promise.all([fetchGenres(), fetchPlatforms(), fetchMultiPlayerMode(), fetchGameName(), fetchAgeRatings()]);

    //build the object based on each index of result
  };

  return { buildGameObj };
};
