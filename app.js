const path = require("path");
const express = require("express");
const app = express();
const port = 5500;

app.use(express.static(path.join(__dirname, "./html")));

app.get("/", (req, res) => {
  res.send(path.join(__dirname, "./html/index.html"));
});

app.get("/error", (req, res) => {
  res.status(404).send("<h1>404 ERROR</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening to port${port}`);
});
