# Band Name Generator

This project is a simple web application that generates a random band name by combining a random adjective and a random noun.

## 🚀 How it Works

The application is built with Node.js, Express, and EJS. When the user clicks the "Generate Name" button, the server generates a new band name and displays it on the page. The "Reset" button clears the generated name.

## 📂 File Structure

-   **`index.js`**: The main server file. It sets up the Express server, handles routes, and contains the logic for generating random band names.
-   **`views/`**: This directory contains the EJS templates.
    -   **`index.ejs`**: The main page of the application. It displays the band name and the buttons.
    -   **`partials/`**: This directory contains the header and footer partials used in the EJS templates.
-   **`public/`**: This directory contains the static files.
    -   **`styles/main.css`**: The stylesheet for the application.
    -   **`scripts/index.js`**: The client-side JavaScript for the reset button functionality.

## 🛠️ Technical Details

-   The server runs on port 3000.
-   It uses the `body-parser` middleware to handle POST requests.
-   The band names are created by randomly selecting an adjective and a noun from predefined arrays within `index.js`.
-   A `POST` request to the `/submit` endpoint triggers the generation of a new band name.

## 🏃‍♀️ How to Run

1.  Navigate to the `4.4 Band Generator Project` directory.
2.  Install the dependencies: `npm install`
3.  Start the server: `node index.js`
4.  Open your browser and go to `http://localhost:3000`.
