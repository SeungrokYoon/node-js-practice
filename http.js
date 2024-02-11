const http = require("http");
const server = http.createServer();

const testClose = function () {
  server.close(() => {
    console.log("test 서버가 종료되었습니다");
  });
};

server.on("request", () => {
  console.log("request");
});

server.on("connection", () => {
  console.log("connection");
});

server.on("close", () => {
  console.log("서버가 종료되었습니다.");
});

server.listen(50000, () => {
  console.log("서버가 동작 중입니다");
});

setTimeout(testClose, 10000);
