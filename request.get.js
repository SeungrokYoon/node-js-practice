const http = require("http");
const url = require("url");

http
  .createServer((req, res) => {
    const get = url.parse(req.url, true).query;
    if (req.method === "GET") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`<h1>${JSON.stringify(get)}</h1>`);
    } else if (req.method === "POST") {
      console.log(`${req.method}방식의 요청입니다.`);
    }
  })
  .listen(50000, () => {
    console.log("서버가 동작중입니다.");
  });
