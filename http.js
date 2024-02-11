const http = require("http");
const fs = require("fs");
const server = http
  .createServer((req, res) => {
    /**
     * 서버에서는 이렇게 파일을 읽어서 Res 객체에 담아 응답해주면,
     * 브라우저는 이것을 파싱해서 화면에 띄워 주는구나.
     */
    fs.readFile("./html/index.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
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
