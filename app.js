const path = require("path");
const express = require("express");
const app = express();
const port = 5500;

// app.use(express.static(path.join(__dirname, "./html")));
app.use((request, response) => {
  const agent = request.header("User-Agent");
  const paramName = request.query.name;
  const browserChrome = "Hello Chrome";
  const browserOthers = "Hello Others";

  console.log(request.headers);
  console.log(request.baseUrl);
  console.log(request.hostname);
  console.log(request.protocol);

  if (agent.toLowerCase().match(/chrome/)) {
    response.write(`<div><p>${browserChrome}</p></div>`);
  } else {
    response.write(`<div><p>${browserOthers}</p></div>`);
  }
  response.write(`<div><p>${agent}</p></div>`);
  response.end();
});

app.get("/", (req, res) => {
  res.send(path.join(__dirname, "./html/index.html"));
});

app.get("/error", (req, res) => {
  res.status(404).send("<h1>404 ERROR</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening to port${port}`);
});
