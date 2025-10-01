import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser"; 
// Body parser is a middleware package. body-parser simplifies handling request payloads by transforming them into usable JavaScript objects within your server's routes. it belongs to the pre-processing middleware.


const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  console.log(req.body); // your form inputs here
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
