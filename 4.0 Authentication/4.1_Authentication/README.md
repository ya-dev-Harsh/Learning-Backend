# Project Overview

This is a simple web application for sharing secrets anonymously. It's built with Node.js and Express, using EJS for templating and PostgreSQL for the database. The application allows users to register and log in to view a secret page.

### File-by-File Analysis

**`index.js` (Main Application File)**

*   **Purpose:** This is the core of your application. It sets up the Express server, connects to the PostgreSQL database, and defines all the application's routes.
*   **Dependencies:** It uses `express` for the web server, `body-parser` to handle form data, and `pg` to interact with the PostgreSQL database.
*   **Database:** It connects to a PostgreSQL database named "World".
*   **Security Vulnerability:** **Passwords are stored in plain text.** This is a major security risk. You should use a library like `bcrypt` to hash passwords before storing them.
*   **Routes:**
    *   `GET /`: Displays the home page.
    *   `GET /login`: Shows the login form.
    *   `GET /register`: Shows the registration form.
    *   `POST /register`: Handles new user registration. It checks for existing users before creating a new one.
    *   `POST /login`: Handles user login. It checks for a matching email and password.
*   **Improvement:** The database credentials are hardcoded. For better security, you should use environment variables (e.g., with the `dotenv` package) to store sensitive information.

**`package.json`**

*   **Purpose:** This file lists the project's dependencies (`express`, `body-parser`, `ejs`, `pg`) and defines project metadata.
*   **Note:** It has a basic `test` script that doesn't run any tests.

**`package-lock.json`**

*   **Purpose:** This file locks the versions of the installed dependencies, ensuring that anyone who runs `npm install` will get the exact same setup.

**`views/` Directory (EJS Templates)**

*   **`home.ejs`:** The landing page with links to register and log in.
*   **`login.ejs`:** Contains the login form.
*   **`register.ejs`:** Contains the registration form.
*   **`secrets.ejs`:** The page displayed after a successful login, which shows the secret message.
*   **`views/partials/`:**
    *   **`header.ejs` & `footer.ejs`:** These are partial templates included in your other EJS files to avoid code duplication. They set up the HTML structure, and include Bootstrap and Font Awesome for styling.

**`public/` Directory (Static Assets)**

*   **`public/css/styles.css`:** This is the stylesheet used by your application. It's served statically by Express.
*   **Note:** You have another `css/styles.css` file in the root of your project that is not being used. You can safely remove it to avoid confusion.

### Summary and Recommendations

This is a solid foundation for a simple authentication application. Here are the key recommendations for improvement:

1.  **Hash Passwords:** This is the most critical change you should make. Never store passwords in plain text.
2.  **Use Environment Variables:** Move your database credentials out of your code and into a `.env` file.
3.  **Implement Sessions:** To keep users logged in, you'll need to add session management. `express-session` and `passport.js` are excellent libraries for this.
4.  **Clean Up Unused Files:** Remove the extra `css` and `partials` directories from the root of your project to keep your file structure clean.
5.  **Fix Duplicate Header:** In `views/register.ejs`, the `<%- include('partials/header') %>` is included twice. You should remove the extra one at the end of the file.
