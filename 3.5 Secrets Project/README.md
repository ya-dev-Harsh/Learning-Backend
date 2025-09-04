# Secrets Project: Basic Authentication with Middleware

This project demonstrates a simple authentication mechanism using Express middleware. The goal is to protect a "secrets" page with a password.

## How It Works

The application presents a user with a password form. If the user enters the correct password, they are granted access to a page with secret content. If the password is incorrect, they are redirected back to the password form.

This logic is implemented using a custom middleware function that acts as a password checker.

### Core Components

1.  **Password Form (`public/index.html`)**: A simple HTML form that asks the user for a password and submits it to the `/check` endpoint via a POST request.

2.  **Middleware (`passChecker` in `index.js`)**:
    -   This middleware intercepts every request.
    -   It uses the `body-parser` middleware to read the `password` from the submitted form data (`req.body`).
    -   It checks if the submitted password matches the hardcoded password ("deengdong").
    -   If the password is correct, it sets a global boolean variable `isUserAuthorised` to `true`.
    -   Crucially, it calls `next()` to pass control to the next function in the request-response cycle.

3.  **Route Handler (`/check` in `index.js`)**:
    -   This handler is triggered when the form is submitted.
    -   It checks the value of the `isUserAuthorised` flag.
    -   If `true`, it serves the `secret.html` file.
    -   If `false`, it redirects the user back to the `/` route to try again.

4.  **Secrets Page (`public/secret.html`)**: The content that is protected and only visible after successful authentication.

### Code Overview (`index.js`)

```javascript
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

var isUserAuthorised = false;

app.use(bodyParser.urlencoded({ extended: true }));

// Custom middleware to check the password
function passChecker(req, res, next) {
  const password = req.body["password"];
  if (password === "deengdong") {
    isUserAuthorised = true;
  }
  next();
}

app.use(passChecker);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  if (isUserAuthorised) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
```

## How to Run the Project

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start the Server**:
    ```bash
    node index.js
    ```

3.  **Access the Application**:
    -   Open your browser and go to `http://localhost:3000`.
    -   Try entering an incorrect password. You should be returned to the same page.
    -   Enter the correct password: `deengdong`. You should now see the secrets page.

## Security Note

This project uses a global variable (`isUserAuthorised`) for authorization, which is **not secure and not suitable for production**. In a real-world application, authentication state should be managed using sessions or tokens (like JSON Web Tokens - JWT) to handle multiple users securely and reliably. This example is purely for demonstrating the concept of middleware.
