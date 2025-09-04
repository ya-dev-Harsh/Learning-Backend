# Passing Data from a Form to an EJS Template

This project demonstrates a common web application pattern: taking user input from a form, processing it on the server, and then passing the result back to the EJS template to display to the user.

## The Application Flow

1.  **Initial Visit (GET request)**: When the user first visits the site (`http://localhost:3000`), the server renders the `index.ejs` template. Since no data is passed, the template shows a form asking for a first and last name.

2.  **Form Submission (POST request)**: The user fills out the form and clicks "Submit". This sends a `POST` request to the `/submit` endpoint.

3.  **Server-Side Processing**: The Express server receives the `POST` request.
    -   It uses the `body-parser` middleware to access the form data (`fname` and `lname`) from `req.body`.
    -   It calculates the total number of letters in the first and last names combined.

4.  **Rendering with Data (re-render)**: The server then re-renders the same `index.ejs` template, but this time it passes an object containing the result of the calculation: `{ numberOfLetters: letters }`.

5.  **Updated View**: The `index.ejs` template now receives the `numberOfLetters` variable. The conditional logic inside the template detects that this variable exists and displays a message showing the total letter count.

## Code Breakdown

### Server (`index.js`)

```javascript
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Handles the initial page load
app.get("/", (req, res) => {
     res.render("index.ejs");
});

// Handles the form submission
app.post('/submit', (req, res) => {
   const letters = req.body["fname"].length + req.body["lname"].length;
   // Re-renders the page, passing the calculated data
   res.render("index.ejs", { numberOfLetters: letters });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
```

### EJS Template (`views/index.ejs`)

The template uses `locals` to check if the `numberOfLetters` variable was passed from the server.

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Passing Data</title>
</head>
<body>
    <% if (locals.numberOfLetters) { %>
        <h1>Your name has <%= numberOfLetters %> letters</h1>
    <% } else { %>
        <h1>Enter your name below ⬇️</h1>
    <% } %>

    <form action="/submit" method="POST">
        <input type="text" name="fname" placeholder="First name">
        <input type="text" name="lname" placeholder="Last name">
        <input type="submit" value="OK">
    </form>
</body>
</html>
```
**Note on `locals`**: In EJS, `locals` is an object that holds all the variables passed to the template from the server. Checking `locals.numberOfLetters` is a safe way to see if the variable exists before trying to use it.

## How to Run

1.  **Install Dependencies**: `npm install`
2.  **Start Server**: `node index.js`
3.  **View in Browser**:
    -   Go to `http://localhost:3000`.
    -   Enter your first and last name and click "OK".
    -   The page will reload and display the total number of letters in your name.
