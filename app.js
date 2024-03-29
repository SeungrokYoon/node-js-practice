const path = require("path");
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const multipart = require("connect-multiparty");

const app = express();
const port = 5500;

app.use(morgan("combined"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./html")));

/**
 * @description bodyParser.urlegincoded extended false이 줄을 지우면 body가 제대로 파싱이 되지 않는다. 그 이유는?
 * application/application/x-www-form-urlencoded 파싱
 */
app.use(bodyParser.urlencoded());

/**
 * @description application/json 파싱
 * */
app.use(bodyParser.json());

/**
 * 미들웨어를 여러개를 순차적으로 엮을 수 있다.
 */
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
  // middleware for handling cookie
  const cookie = request.cookies;
  console.log(cookie);
  next();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./html/index.html"));
});

app.get("/set-cookie", (req, res) => {
  res.cookie("user", {
    id: "0001",
    name: "seungrok",
    authorized: true,
    created_at: new Date().toDateString(),
  });
  res.redirect("/");
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

app.get("/multipart", (req, res) => {
  fs.readFile(
    path.join(__dirname, "./html/connect-multiparty.html"),
    (err, data) => {
      if (err) throw err;
      res.send(data.toString());
    }
  );
});

app.use(multipart({ uploadDir: `${__dirname}/upload` }));
app.post("/multipart", (req, res) => {
  const imgFile = req.files.image;
  console.log(req.body, req.files);
  console.log(__dirname);
  const outputPath = `${__dirname}/upload/${Date.now()}_${imgFile.name}`;
  try {
    fs.renameSync(imgFile.path, outputPath);
    console.log("File uploaded successfully");
  } catch (error) {
    console.error("Error renaming file:", error);
    return res.status(500).send("Error uploading file");
  }
  res.redirect("/");
});

app.get("/error", (req, res) => {
  res.status(404).send("<h1>404 ERROR</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening to port${port}`);
});
