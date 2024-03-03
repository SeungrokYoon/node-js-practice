const express = require("express");
const app = express();
const port = 5500;

app.get("/", (req, res) => {
  res.send({ answer: "Hello world" });
});

app.listen(port, () => {
  console.log(`Example app listening to port${port}`);
});
