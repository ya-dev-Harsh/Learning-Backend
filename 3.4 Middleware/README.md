# Understanding Middleware in Express.js

Middleware functions are a fundamental concept in Express.js. They are functions that have access to the request object (`req`), the response object (`res`), and the `next` function in the application’s request-response cycle. Middleware can execute any code, make changes to the request and the response objects, end the request-response cycle, and call the next middleware in the stack.

This directory contains several examples demonstrating different types of middleware.

## 1. Third-Party Middleware: `body-parser`

`body-parser` is a popular middleware used to parse incoming request bodies. It makes the parsed data available on `req.body`. This is essential for handling data submitted from forms.

### Example (`index1.js`)

This example shows how to use `body-parser` to handle a POST request from an HTML form.

```javascript
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Use body-parser to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  // The parsed form data is available in req.body
  console.log(req.body);
  res.send("Form submitted!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
```

## 2. Third-Party Middleware: `morgan`

`morgan` is a logging middleware. It logs details about incoming HTTP requests, which is very useful for debugging and monitoring your application.

### Example (`index2.js`)

This example demonstrates how to use `morgan` for request logging.

```javascript
import express from "express";
import morgan from 'morgan';

const app = express();
const port = 3000;

// Use morgan with the "dev" format for concise, color-coded logs
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
```
When you run this server and make a request to `http://localhost:3000`, you will see a log in your console like: `GET / 304 - - 2.233 ms`.

## 3. Custom Middleware

You can easily write your own middleware functions to perform specific tasks. A custom middleware is just a function with the `(req, res, next)` signature.

### Example (`index3.js`)

This example shows a simple custom logger middleware.

```javascript
import express from "express";

const app = express();
const port = 3000;

// Custom middleware function
function logger(req, res, next) {
  console.log("Request Method:", req.method);
  console.log("Request URL:", req.url);
  next(); // IMPORTANT: Call next() to pass control to the next middleware
}

app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
```

## 4. Combining Middleware: Band Name Generator

This example (`index4.js`) combines `body-parser` with a custom middleware to create a simple "Band Name Generator".

-   The `bodyParser` middleware parses the form data.
-   The `bandNameGenerator` custom middleware accesses the parsed data from `req.body`, creates a band name, and attaches it to a variable.
-   The `/submit` route handler then uses this variable to send a response.

### Code (`index4.js`)
```javascript
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var bandName = "";

app.use(bodyParser.urlencoded({ extended: true }));

// Custom middleware to generate the band name
function bandNameGenerator(req, res, next) {
  if (req.body.street && req.body.pet) {
    bandName = req.body.street + req.body.pet;
  }
  next();
}

app.use(bandNameGenerator);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  res.send(`<h1>Your band name is:</h1><h2>${bandName}</h2>`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
```

To try this, run `node index4.js`, go to `http://localhost:3000`, fill out the form, and submit it.
