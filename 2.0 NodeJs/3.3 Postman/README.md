# Testing API Endpoints with Postman

This section explains how to use Postman, a popular API platform, to test the various endpoints of a Node.js Express application.

## What is Postman?

Postman is a tool that simplifies the process of developing, testing, and documenting APIs. It allows you to send HTTP requests to a server and view the responses without needing to write any client-side code. This is incredibly useful for backend development, as you can test your API endpoints as you build them.

## API Endpoints for Testing

The `index.js` file in this directory sets up an Express server with five different routes, each handling a different HTTP method. These are designed to be tested with Postman.

### Code Overview (`index.js`)

```javascript
import express from "express";
const app = express();
const port = 3000;

// GET request to the home page
app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

// POST request to register a user
app.post("/register", (req, res) => {
  // In a real application, you would process the registration data here.
  res.sendStatus(201); // 201 Created
});

// PUT request to update a user's data
app.put("/user/angela", (req, res) => {
  // In a real application, you would update the user's data here.
  res.sendStatus(200); // 200 OK
});

// PATCH request to partially update a user's data
app.patch("/user/angela", (req, res) => {
  // In a real application, you would patch the user's data here.
  res.sendStatus(200); // 200 OK
});

// DELETE request to delete a user
app.delete("/user/angela", (req, res) => {
  // In a real application, you would delete the user here.
  res.sendStatus(200); // 200 OK
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
```

## How to Test with Postman

1.  **Start the Server**:
    -   Install dependencies: `npm install`
    -   Run the server: `node index.js` (or `nodemon index.js` for automatic restarts).

2.  **Open Postman**: Launch the Postman application.

3.  **Test Each Route**: Create a new request in Postman for each of the following endpoints.

    -   **GET /**
        -   **Method**: `GET`
        -   **URL**: `http://localhost:3000/`
        -   **Action**: Click "Send".
        -   **Expected Response**: You should see the HTML `<h1>Home Page</h1>` in the response body and a `200 OK` status code.

    -   **POST /register**
        -   **Method**: `POST`
        -   **URL**: `http://localhost:3000/register`
        -   **Action**: Click "Send".
        -   **Expected Response**: You should receive a `201 Created` status code.

    -   **PUT /user/angela**
        -   **Method**: `PUT`
        -   **URL**: `http://localhost:3000/user/angela`
        -   **Action**: Click "Send".
        -   **Expected Response**: You should receive a `200 OK` status code.

    -   **PATCH /user/angela**
        -   **Method**: `PATCH`
        -   **URL**: `http://localhost:3000/user/angela`
        -   **Action**: Click "Send".
        -   **Expected Response**: You should receive a `200 OK` status code.

    -   **DELETE /user/angela**
        -   **Method**: `DELETE`
        -   **URL**: `http://localhost:3000/user/angela`
        -   **Action**: Click "Send".
        -   **Expected Response**: You should receive a `200 OK` status code.

This exercise helps in understanding how different HTTP methods are used to represent different actions (Create, Read, Update, Delete - CRUD) and how to test them effectively.
