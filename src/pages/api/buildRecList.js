import { useBuildRecListService } from "./services/buildRecList.service";

export default async function buildRecs(req, res) {
  const responseId = req.body;
  console.log({ responseId });
  //const { recList } = useBuildRecListService({ responseId });
  const { buildGameRecList } = useBuildRecListService( {responseId} );

  const recList = {}; // temp otherwise app breaks
  //const recList = await buildGameRecList();

  return res.status(200).json(recList);
}

// TypeError: selectedResponseId is not iterable