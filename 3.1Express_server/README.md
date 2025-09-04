# Creating a Basic Express Server

This section demonstrates how to create a simple web server using the Express.js framework.

## What is Express.js?

Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It is the most popular web framework for Node.js.

## Code Overview (`index.js`)

The `index.js` file contains the code for a basic Express server.

```javascript
import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
```

### Code Breakdown

1.  **`import express from "express";`**: Imports the Express.js module. This is possible because `"type": "module"` is set in `package.json`.
2.  **`const app = express();`**: Creates an instance of the Express application.
3.  **`const port = 3000;`**: Defines the port number on which the server will listen for incoming requests.
4.  **`app.get("/", (req, res) => { ... });`**: This defines a route handler for HTTP GET requests to the root URL (`/`).
    -   `req`: The request object, containing information about the incoming request.
    -   `res`: The response object, used to send a response back to the client.
    -   `res.send("Hello world!");`: Sends the string "Hello world!" as the response body.
5.  **`app.listen(port, () => { ... });`**: Starts the server and makes it listen for connections on the specified port.
    -   The callback function `() => { ... }` is executed once the server is successfully started.

## How to Run the Server

1.  **Install Dependencies**: Navigate to this directory in your terminal and install the `express` package:
    ```bash
    npm install
    ```

2.  **Start the Server**: Run the `index.js` file using Node.js:
    ```bash
    node index.js
    ```
    You will see the message "Server running on port 3000" in your console.

3.  **Access the Server**: Open your web browser and navigate to `http://localhost:3000`. You should see the message "Hello world!".

## Dependencies

-   `express`: The web application framework used to create the server.
