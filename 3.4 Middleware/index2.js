import express from "express";
import morgan from 'morgan';
// it is a logging type middleware that logs HTTP requests to your server. It provides detailed information about incoming requests such as the HTTP method (GET, POST, etc.), request URL, status code, response time, and more.

const app = express();
const port = 3000;

app.use(morgan("dev")); //  'combined', 'common', 'dev', 'short', 'tiny')

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
