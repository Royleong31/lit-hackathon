import { type NextApiRequest, type NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(400).json({ message: "Invalid method" });
  console.log(req.body);
  // const data = JSON.parse(JSON.stringify({ hi: "bye" }));
  console.log(req.body);

  // console.log(JSON.parse(req.body));
  res.send("ok");
}
