# Travel Tracker

This is a simple web application that allows users to track the countries they have visited. It uses a world map SVG to visually represent the visited countries.

## Features

- Add a country to the visited list.
- See the visited countries highlighted on a world map.
- Display the total number of visited countries.

## Folder Structure

- `index.js`: The main server file.
- `package.json`: Contains project metadata and dependencies.
- `public/`: Contains static files like stylesheets.
- `public/styles/main.css`: Stylesheet for the application.
- `views/`: Contains the EJS templates.
- `views/index.ejs`: The main view of the application, containing the world map and the form to add countries.

## How it works

### Back-End (`index.js`)

The back-end is built with Node.js and Express. It uses the `pg` library to connect to a PostgreSQL database.

- **`db`**: A `pg.Client` object is created to connect to the "World" database.
- **`checkVisisted()`**: An asynchronous function that queries the `visited_country` table to get the `country_code` of all visited countries. It returns an array of country codes.
- **`app.get("/", ...)`**: The main route of the application. It calls `checkVisisted()` to get the list of visited countries and renders the `index.ejs` template, passing the `countries` array and the `total` number of visited countries.
- **`app.post("/add", ...)`**: This route handles the form submission. It takes the country name from the request body and queries the `books` table to find the corresponding `country_code`. If a country is found, it inserts the `country_code` into the `visited_country` table and redirects to the main page. If the country is not found or has already been added, it renders the `index.ejs` template with an appropriate error message.
- **`app.listen(port, ...)`**: Starts the server on port 3000.

### Database Interaction in Detail

The application interacts with the PostgreSQL database in the following ways:

1.  **Database Connection:**
    - A `pg.Client` object is instantiated with the database connection details (user, host, database name, password, and port).
    - The `db.connect()` method is called to establish a connection with the database.

2.  **`checkVisisted()` function:**
    - This function is responsible for fetching the list of already visited countries from the database.
    - It executes a `SELECT` query on the `visited_country` table to get all the `country_code` values.
    - The result of the query is an array of objects, and the function extracts the `country_code` from each object and returns an array of country codes.

3.  **`app.post("/add")` route:**
    - This is where the application writes to the database.
    - It first performs a `SELECT` query on the `books` table to find the `country_code` for the country name entered by the user. The query uses `LOWER()` and `LIKE` to perform a case-insensitive search.
    - If a matching country is found, it then executes an `INSERT` query to add the `country_code` to the `visited_country` table.
    - The `INSERT` query is wrapped in a `try...catch` block to handle potential errors, such as attempting to add a country that is already in the `visited_country` table (which would violate a unique constraint).
    - If the `INSERT` is successful, the user is redirected to the home page.
    - If the `INSERT` fails, or if the initial `SELECT` query doesn't find a matching country, an appropriate error message is rendered on the home page.

### Front-End (`views/index.ejs`)

The front-end is a single EJS template that displays a world map and a form.

- **World Map**: The world map is an SVG image where each country is a `<path>` element with a unique `id` corresponding to its two-letter country code.
- **Form**: A simple form with a text input for the country name and a submit button. The form submits a POST request to the `/add` route.
- **JavaScript**: The script at the bottom of the page takes the array of visited country codes passed from the server and uses it to change the fill color of the corresponding SVG paths to 'teal', highlighting the visited countries.

### Styling (`public/styles/main.css`)

The `main.css` file contains the styles for the application, including the world map, the form, and the total count display.
