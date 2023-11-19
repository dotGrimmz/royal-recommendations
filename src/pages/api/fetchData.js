import { useFetchDataService } from "./services/fetchData.service";

export default async function fetchData(req, res) {
  const { buildGameObj } = useFetchDataService();

<<<<<<< HEAD
  const results = await buildGameObj();
  //const result = [...results];

  // structure each promise as an object
  // ex. genres in a genre obj
  //console.log("results:" + result);
  return res.status(200).json(results);
=======
    const results = await buildGameObj();
    
    // structure each promise as an object
    // ex. genres in a genre obj
    return res.status(200).json(results);
>>>>>>> 38b11e67d0cfa62053a996cf2cd749913306f4f1
}



/*
    handler = api endpoint
    create new handler/service file

    retro games- yes = 1 (1980s to 1990)
                no = 0 (1990s onwards) for release date

    body: selectedResponseId: [{id: 02, param: platform},  {id: 453556, param: genre}, {id: 32, param:multiplayerStatus }, { id: 00 , param: retro} ]

    from handler pass to service, break down to query params, back to same handler

*/