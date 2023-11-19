import { useBuildRecListService } from "./services/buildRecList.service";

export default async function buildRecs(req, res) {

    const responseId = req.body;
    const {recList} = useBuildRecListService({responseId});

    return res.status(200).json(recList);

}