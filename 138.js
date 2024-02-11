const http = require("http");
const fs = require("fs");
const url = require("url");
const server = http
  .createServer((req, res) => {
    const pathname = url.parse(req.url).pathname;
    if (pathname === "/") {
      fs.readFile("./html/138_index.html", (err, data) => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
      console.log(url.parse(req.url));
    }
  })
  .listen(50000, () => {
    console.log("서버가 동작 중입니다");
  });

server.on("request", () => {
  console.log("request");
});

server.on("connection", () => {
  console.log("connection");
});

server.on("close", () => {
  console.log("서버가 종료되었습니다.");
});
