# DIY API Notes

This document provides an overview of the `index.js` file, which sets up a simple API for managing a collection of jokes.

## Endpoints

The API exposes the following endpoints:

- `GET /random`: Returns a random joke.
- `GET /specific/:id`: Returns a specific joke by its ID.
- `GET /filter?type=<type>`: Returns all jokes of a specific type.
- `POST /jokes`: Adds a new joke.
- `PUT /replace/:id`: Replaces an existing joke.
- `PATCH /edit/:id`: Edits an existing joke.
- `DELETE /delete/:id`: Deletes a specific joke.
- `DELETE /delete_all?key=<masterKey>`: Deletes all jokes (requires a master key).

## JavaScript Methods Used

The `index.js` file utilizes several important JavaScript methods to achieve its functionality:

### Express.js Methods

-   `app.use(bodyParser.urlencoded({ extended: true }));`: This line configures the `body-parser` middleware to handle URL-encoded data.
-   `app.get(...)`: Defines routes for handling HTTP GET requests.
-   `app.post(...)`: Defines a route for handling HTTP POST requests.
-   `app.put(...)`: Defines a route for handling HTTP PUT requests.
-   `app.patch(...)`: Defines a route for handling HTTP PATCH requests.
-   `app.delete(...)`: Defines a route for handling HTTP DELETE requests.
-   `app.listen(...)`: Starts the Express server and makes it listen for incoming connections on a specified port.

### Math Methods

-   `Math.random()`: Used in the `/random` endpoint to get a random joke. It returns a floating-point, pseudo-random number in the range 0 to less than 1.
-   `Math.floor()`: Used in conjunction with `Math.random()` to get a whole number index for the `jokes` array.

### Array Methods

-   `Array.prototype.find()`: Used in the `/specific/:id` and `/edit/:id` endpoints to find the first element in the `jokes` array that satisfies the provided testing function.
-   `Array.prototype.filter()`: Used in the `/filter` endpoint to create a new array with all elements that pass the test implemented by the provided function.
-   `Array.prototype.push()`: Used in the `/jokes` endpoint to add a new joke to the end of the `jokes` array.
-   `Array.prototype.slice()`: Used in the `/jokes` endpoint to get the last element of the array.
-   `Array.prototype.findIndex()`: Used in the `/replace/:id`, `/edit/:id`, and `/delete/:id` endpoints to find the index of a joke in the `jokes` array.
-   `Array.prototype.splice()`: Used in the `/delete/:id` endpoint to remove a joke from the `jokes` array.

### Other Methods

-   `parseInt()`: Used to convert the `id` parameter from a string to an integer in endpoints like `/specific/:id`.
-   `res.json()`: Sends a JSON response.
-   `res.sendStatus()`: Sets the response HTTP status code and sends the registered status message as the response body.
-   `res.status().json()`: Sets the HTTP status for the response and sends a JSON response.
-   `console.log()`: Used to log information to the console.
