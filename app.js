const path = require("path");
const express = require("express");
const app = express();
const port = 5500;

app.use(express.static(path.join(__dirname, "./html")));

app.use((request, response, next) => {
  console.log("first middleware");
  request.user1 = "승록";
  next();
});

app.use((request, response, next) => {
  console.log("second middleware");
  request.user2 = "승재";
  next();
});

app.use((request, response, next) => {
  console.log("third middleware");
  response.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
  response.write(`<div><p>${request.user1}</p></div>`);
  response.write(`<div><p>${request.user2}</p></div>`);
  response.end(`<h1>express서버에서 응답한 결과</h1>`);
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
