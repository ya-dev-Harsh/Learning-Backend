# Handling HTTP Requests with Express

This section covers how to handle different HTTP requests and routes using Express.js, and provides a reference for common HTTP status codes.

## Express Routing

Routing refers to how an application’s endpoints (URIs) respond to client requests. In Express, you can define routes for different HTTP methods (GET, POST, etc.) and URL patterns.

### Code Overview (`index.js`)

The `index.js` file demonstrates how to set up different routes for an Express server.

```javascript
import express from 'express';
const app = express();
const port = 3000;

// Route for the homepage
app.get("/", (req, res) => {
    res.send("<h1>Hello</h1>");
});

// Route for the "about" page
app.get("/about", (req, res) => {
    res.send("<h1>About me</h1><p>Hii my name is harsh </p>");
});

// Route for the "contact" page
app.get("/contact", (req, res) => {
    res.send("<h1>Contact me</h1><p>Here is my contact : 848575957</p>");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
```

### How to Run the Server

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start the Server**:
    ```bash
    node index.js
    ```

3.  **Access the Routes**:
    -   Open your browser and go to `http://localhost:3000` to see the homepage.
    -   Navigate to `http://localhost:3000/about` to see the "About Me" page.
    -   Navigate to `http://localhost:3000/contact` to see the "Contact Me" page.

## HTTP Status Codes

HTTP status codes are standard responses given by web servers on the internet. The codes help identify the status of a request. The `HTTP_request_return_codes.txt` file contains a comprehensive list of these codes.

Here is a summary of the main categories:

-   **1xx (Informational)**: The request was received, continuing process.
-   **2xx (Success)**: The request was successfully received, understood, and accepted.
    -   `200 OK`: The request has succeeded.
    -   `201 Created`: The request has been fulfilled and has resulted in one or more new resources being created.
-   **3xx (Redirection)**: Further action needs to be taken in order to complete the request.
    -   `301 Moved Permanently`: The target resource has been assigned a new permanent URI.
-   **4xx (Client Error)**: The request contains bad syntax or cannot be fulfilled.
    -   `400 Bad Request`: The server cannot or will not process the request due to something that is perceived to be a client error.
    -   `403 Forbidden`: The server understood the request but refuses to authorize it.
    -   `404 Not Found`: The server can't find the requested resource.
-   **5xx (Server Error)**: The server failed to fulfill an apparently valid request.
    -   `500 Internal Server Error`: A generic error message, given when an unexpected condition was encountered.

By default, Express sends a `200 OK` status code with successful responses. You can manually set the status code using `res.sendStatus()` or `res.status().send()`.
