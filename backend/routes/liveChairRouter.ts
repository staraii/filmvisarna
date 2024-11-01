import express from "express";
import LiveChairController from "../controller/liveChairController.js";

const router = express.Router();
const liveChairController = new LiveChairController();

router.get("/:screeningId", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();
  const id = Number(req.params.screeningId);

  const fetchAndSendData = async (id: number) => {
    try {
      //här fetchar jag bara screening med id=1 för testsyften, hela denna route ska nog egentligen kallas någon annanstans
      const message = await liveChairController.fetchLiveChairs(id);
      if (message) res.write(`data: ${JSON.stringify(message[0])}\n\n`);
    } catch (error) {
      console.error("Error fetching live chairs:", error);
      res.write(
        `data: ${JSON.stringify({ error: "Error fetching data" })}\n\n`
      );
    }
  };
  const intervalId = setInterval(() => fetchAndSendData(id), 5000);

  fetchAndSendData(id);

  //Stolar hämtas var 5e sekund, denna funktion testas med hjälp av curl "curl localhost:5001/events"

  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
});

export default router;
