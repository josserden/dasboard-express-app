import http from "http";

const host = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  switch (req.method) {
    case "GET":
      switch (req.url) {
        case "/hello":
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/plain");
          res.end("Hello");

          break;

        case "/world":
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/plain");
          res.end("World");

        default:
          break;
      }
      break;

    case "POST":
      switch (req.url) {
        case "/hello2":
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/plain");
          res.end("Hello POST");

          break;

        case "/world2":
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/plain");
          res.end("World POST");

          break;

        default:
          break;
      }

    default:
      break;
  }
});

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
