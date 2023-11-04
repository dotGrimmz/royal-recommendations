import { useFetchDataService } from "./services/fetchData.service";

export default async function fetchData(req, res) {
    const {buildGameObj} = useFetchDataService();

    const results = await buildGameObj();
    const result = [...results];
    //console.log("results:" + result);
    return res.status(200).json({ data: results });
}
