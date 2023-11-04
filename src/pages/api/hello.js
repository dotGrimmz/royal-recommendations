// Next.js API route support: https://nextjs.org/docs/api-routes/introduction



// import FetchGameRecs from "./services/igdb-get-recs";

// export default async function handler(req, res) {
//   //res.status(200).json({ name: "Grimmz" });

//   await console.log(FetchGameRecs);
// }

import axios from "axios";
import getAccessToken from "./get-access-token";

// store in ENV variables later
const clientID = "h1xgwhjvma1rvd46q2qwphbozrm58u"; 

const FetchGameRecs = async(req, res) => {
  try {
      // need access token to make requests
      const token = await getAccessToken();
      const tokenType = `Bearer ${token}`;

      console.log(token);


      const headers = {
              "Accept": "application/json",
              "Client-ID": clientID, 
              "Authorization": tokenType
          };

      // make request for 10 games based on params 

      const response = await axios.post(
          "https://api.igdb.com/v4/genres/",
          "fields name; limit 50;",
          {headers: headers}); 

      let games = [...response.data];

      console.log(response.data)

      //console.log(games.length);

      //console.log(games)

      // let genres;
      // games.forEach(function (game) {
      //     console.log(`${game.name}\n${JSON.stringify(game.genres)}\n`);
      //     //console.log(game+`\n`);
      // });

    res.status(200).json(games);

  }catch(err) {
      throw err;
  }
}

export default FetchGameRecs;