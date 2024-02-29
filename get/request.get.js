const http = require("http");
const url = require("url");

http
  .createServer((req, res) => {
    const url = new URL(req.url, "https://127.0.0.1:50000");
    if (req.method === "GET") {
      res.writeHead(200, {
        "Content-Type": "text/html",
        "Set-Cookie": ["drink=coffee", "desert=cake"],
      });
      res.end(`<h1>${req.headers.cookie}</h1>`);
    } else if (req.method === "POST") {
      console.log(`${req.method}방식의 요청입니다.`);
    }
  })
  .listen(50000, () => {
    console.log("서버가 동작중입니다.");
  });
