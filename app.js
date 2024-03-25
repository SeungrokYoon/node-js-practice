const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5500;

app.use(express.static(path.join(__dirname, "./html")));

/**
 * @description bodyParser.urlencoded extended false는
 */
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * 미들웨어를 여러개를 순차적으로 엮을 수 있다.
 */
app.use((request, response, next) => {
  console.log(request.body);
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
  next();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./html/index.html"));
});

app.get("/login", (req, res) => {
  res.status(200).set("Content-Type", "text/html");
  res.sendFile(path.join(__dirname, "./html/login.html"));
});

app.post("/login", (req, res) => {
  const { userId, password } = req.body;
  if (!userId || !password) {
    return res.status(400).json({ error: "Missing id, pw" });
  }
  res.status(200).set("Content-Type", "application/json");
  const jsonData = {
    date: new Date(),
    userId,
    password,
  };
  res.json(jsonData);
});

app.get("/error", (req, res) => {
  res.status(404).send("<h1>404 ERROR</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening to port${port}`);
});
