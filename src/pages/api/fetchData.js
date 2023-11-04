import { useFetchDataService } from "./services/fetchData.service";

export default async function fetchData(req, res) {
    const {buildGameObj} = useFetchDataService();

    const results = await buildGameObj();
    //const result = [...results];

    // structure each promise as an object
    // ex. genres in a genre obj
    //console.log("results:" + result);
    return res.status(200).json(results);
}
