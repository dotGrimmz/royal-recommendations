import { useExampleService } from "./services/example.service";
export default async function example(req, res) {
  const { buildGameObj } = useExampleService();
  const results = await buildGameObj();
  console.log({ results });
  return res.status(200).json({ data: results });
}
