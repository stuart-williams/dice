import { eventsClient } from "common/api";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
  // TODO: response types
  const { data } = await eventsClient.get("events", {
    params: {
      "page[size]": 12,
      "page[number]": 1,
    },
  });

  res.json(data);
});

export default router.handler({
  onError: (error, req, res) => {
    // TODO: error logging & response message
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Not Found");
  },
});
