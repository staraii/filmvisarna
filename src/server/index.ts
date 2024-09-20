import express from "express";


export const app = express();

if (!process.env["VITE"]) {
  const frontendDir = process.cwd() + "/dist";
  app.use(express.static(frontendDir));
  app.get("/*", (_, res) => {
    res.send(frontendDir + "/index.html");
  });
  app.listen(process.env["PORT"]);
}

app.get("/api/", (_req, res) => {
  res.json({ success: "Server running" });
});


