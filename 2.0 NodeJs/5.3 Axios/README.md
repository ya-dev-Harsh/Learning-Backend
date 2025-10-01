# Bored Activity Finder

This project is a simple web application that helps users find things to do by interacting with the Bored API. It can suggest random activities or find one based on user-specified criteria.

## 🚀 How it Works

The application is built with Node.js, Express, EJS, and uses the **Axios** library to make HTTP requests to the [Bored API](https://www.boredapi.com/).

-   On the initial visit, the app fetches and displays a random activity.
-   Users can use the dropdown menus to select an activity type and the number of participants, then click "Go" to get a matching suggestion.

## 📂 File Structure

-   **`index.js`**: The main server file. It sets up the Express server, defines the routes, and uses Axios to fetch data from the Bored API.
-   **`views/`**: This directory contains the EJS template.
    -   **`index.ejs`**: The single-page template that displays the activity suggestion and the form for filtering activities.
-   **`public/`**: This directory contains static files.
    -   **`styles/main.css`**: The stylesheet for the application.

## 🛠️ Technical Details

-   The server runs on port 3000.
-   It uses `body-parser` to handle the POST request from the filter form.
-   A `GET` request to the `/` route fetches a random activity from `https://bored-api.appbrewery.com/random`.
-   A `POST` request to the `/` route sends the user's choices to the API's filter endpoint (`https://bored-api.appbrewery.com/filter`) to find a relevant activity.
-   The application includes error handling for API requests. If an API call fails or returns no results, a user-friendly error message is displayed.

## 📝 What is Axios and Why Use It?

**Axios** is a popular, promise-based JavaScript library for making HTTP requests from both the browser and Node.js. While modern JavaScript has the built-in `fetch()` API, Axios provides several advantages that make it a common choice for developers:

-   **Automatic JSON Parsing**: Axios automatically converts the response data into a JavaScript object. With `fetch()`, you have to manually do this by calling `response.json()`.
-   **Better Error Handling**: Axios treats responses with error status codes (like 404 or 500) as rejected promises, which simplifies catching errors. `fetch()` does not consider these as errors, requiring you to manually check the status code.
-   **Request & Response Interceptors**: You can intercept requests or responses to modify them or perform tasks like adding authentication tokens or logging.
-   **Request Cancellation**: Axios has built-in support for cancelling requests.

In this project, Axios simplifies the code by handling the JSON parsing and making the error handling more straightforward.

## 🏃‍♀️ How to Run

1.  Navigate to the `5.3 Axios` directory.
2.  Install the dependencies: `npm install`
3.  Start the server: `node index.js`
4.  Open your browser and go to `http://localhost:3000`.
