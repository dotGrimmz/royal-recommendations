import { VERSION_ONE_TEMPLATE } from "@/templates/version_one";
import axios from "axios";

export const useFillV1TemplateService = () => {

  const CLIENT_ID = "h1xgwhjvma1rvd46q2qwphbozrm58u";
  const CLIENT_SECRET = "eorcmduiaee82df9u8uhzfyuobczzb";
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
    if (token) {
      const tokenType = `Bearer ${token}`;
      const headers = {
        Accept: "application/json",
        "Client-ID": CLIENT_ID,
        Authorization: tokenType,
      };
      const response = await axios.post(url, query, { headers: headers });
      return [...response.data];
    }
  };

  const fetchGenres = async () => {
    const url = "https://api.igdb.com/v4/genres/";
    // reduce query string to only 4
    //(4, 5, 7, 8, 9, 12, 13, 14, 15, 24, 31, 33, 36)
    /*
        4 fighting --
        5 shooter --
        7 music ------------ (not used)
        8 platform --
        9 puzzle --
        12 RPG --
        13 simulator --
        14 sport --
        15 stragety --
        24 tactical --
        31 adventure --
        33 arcade --
        36 MOBA --

        (4, 8, 13, 15)
        (36, 33, 14, 24)
        (12, 9, 5, 31)

     */
    // make second function with 4 different genre calls
    const query =
      "fields name; where id = (4, 8, 13, 15); limit 4;";
    try {
      return await callIGDB(url, query);
    } catch (err) {
      throw err;
    }
  };

  
  const fetchGenres_II = async () => {
    const url = "https://api.igdb.com/v4/genres/";
    const query =
      "fields name; where id = (36, 33, 14, 24); limit 4;";
    try {
      return await callIGDB(url, query);
    } catch (err) {
      throw err;
    }
  };

  const fetchGenres_III = async () => {
    const url = "https://api.igdb.com/v4/genres/";
    const query =
      "fields name; where id = (12, 9, 5, 31); limit 4;";
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
      let platformObjs; // the platform object being shaped

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

      platformObjs = [
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
    const [genres, genres_II, genres_III, platforms, multiPlayers, ageRating] = await Promise.all([
      fetchGenres(),
      fetchGenres_II(),
      fetchGenres_III(),
      fetchPlatforms(),
      fetchMultiPlayerMode(),
      fetchAgeRatings(),
    ]);

    return {
      genres: genres,
      genres_II: genres_II,
      genres_III: genres_III,
      platforms: platforms,
      multiPlayers: multiPlayers,
      ageRating: ageRating,
    };

    //build the object based on each index of result
  };

  const populateQuestionOptions = (gameField, originalOps) => {
  
    let options = [];
      
      gameField.forEach((item, index) => {
        let option = {
          imgSrc: originalOps[index].imgSrc,
          id: item.id,
          name: item.name
        }
  
        options.push(option);
      })
      return options;
  
  };

  const getV1Template = async () => {
  
    const {genres, genres_II, genres_III, platforms, multiPlayers} = await buildGameObj();
    // Deep clone using JSON
    const v1 = JSON.parse(JSON.stringify(VERSION_ONE_TEMPLATE, null, 2));
    // q6 is the retro game status; we need this only to build the rec list
    const [questionOne, questionTwo, questionThree, questionFour, questionFive] = v1;

    questionOne.options = populateQuestionOptions(platforms, questionOne.options);
    questionTwo.options = populateQuestionOptions(genres, questionTwo.options);
    questionThree.options = populateQuestionOptions(genres_II, questionThree.options);
    questionFour.options = populateQuestionOptions(genres_III, questionThree.options);
    questionFive.options = populateQuestionOptions(multiPlayers, questionFour.options);

    // just realized why this won't quite work
    // v1.forEach( (question => {
    //   question.options = populateQuestionOptions(, question.options)
    // }))

    return v1;
  }

  //(async () => await getV1Template())();

   return { getV1Template };
 };


 /*
    create decloned v1 template
    function that will accept clone
    call populateOptions on clone, overwrite options prop (name, id only)
    clone will have all OG properties

    return this clone to handler, client calls handler
 */
/*
  
*/