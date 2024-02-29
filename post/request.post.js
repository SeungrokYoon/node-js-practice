const http = require("http");
const fs = require("fs");
const path = require("path");

http
  .createServer((req, res) => {
    if (req.method === "GET") {
      const filePath = path.join(__dirname, "../html/140_example.html");
      fs.readFile(filePath, (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
    } else if (req.method === "POST") {
      req.on("data", (data) => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
    }
  })
  .listen(50000, () => {
    console.log("서버가 동작중입니다");
  });
