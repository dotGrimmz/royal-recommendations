import { useBuildRecListService } from "./services/buildRecList.service";

export default async function buildRecs(req, res) {
  const selectedResponseId = req.body;
  //console.log({ selectedResponseId });
  //const { recList } = useBuildRecListService({ responseId });
  const { buildGameRecList } = useBuildRecListService( {selectedResponseId} );

  //const recList = {}; // temp otherwise app breaks
  const recList = await buildGameRecList();

  return res.status(200).json(recList);
}

