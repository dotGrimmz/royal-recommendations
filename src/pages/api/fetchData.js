import { useFetchDataService } from "./services/fetchData.service";

export default async function fetchData(req, res) {

  const { getV1Template } = useFetchDataService();
  const results = await getV1Template();

  //   console.log(questions);
    return res.status(200).json(results);
}


/*
    handler = api endpoint
    create new handler/service file

    retro games- yes = 1 (1980s to 1990)
                no = 0 (1990s onwards) for release date

    body: selectedResponseId: [{id: 02, param: platform},  {id: 453556, param: genre}, {id: 32, param:multiplayerStatus }, { id: 00 , param: retro} ]

    from handler pass to service, break down to query params, back to same handler

*/