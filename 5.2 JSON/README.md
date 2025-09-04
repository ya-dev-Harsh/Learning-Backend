# Recipe Viewer

This project is a simple web application that displays recipes from a JSON file.

## 🚀 How it Works

The application is built with Node.js, Express, and EJS. It reads recipe data from a `recipe.json` file. Users can select a recipe from the dropdown menu, and the application will display the details for the selected recipe.

## 📂 File Structure

-   **`index.js`**: The main server file. It sets up the Express server, handles routes, and reads the `recipe.json` file to send recipe data to the EJS template.
-   **`views/`**: This directory contains the EJS templates.
    -   **`index.ejs`**: The main page of the application. It displays the recipe details and the recipe selection form.
-   **`public/`**: This directory contains the static files.
    -   **`styles/main.css`**: The stylesheet for the application.
-   **`recipe.json`**: A JSON file that stores the recipe data, including ingredients and instructions.

## 🛠️ Technical Details

-   The server runs on port 3000.
-   It uses the `body-parser` middleware to handle POST requests from the recipe selection form.
-   When a user selects a recipe, a `POST` request is sent to the `/recipe` endpoint. The server then finds the corresponding recipe in the JSON data and renders the `index.ejs` template with the recipe's information.

## 🏃‍♀️ How to Run

1.  Navigate to the `5.2 JSON` directory.
2.  Install the dependencies: `npm install`
3.  Start the server: `node index.js`
4.  Open your browser and go to `http://localhost:3000`.

---

## 📝 Interacting with and Using JSON

JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write and easy for machines to parse and generate. In JavaScript, you can work with JSON using two main methods:

### `JSON.parse()`: Converting a JSON String to a JavaScript Object

When you receive data from a web server, the data is always a string. `JSON.parse()` is used to convert the JSON string into a JavaScript object so you can access its properties.

**Example:**
```javascript
const jsonString = '{"name":"John", "age":30, "city":"New York"}';
const obj = JSON.parse(jsonString);

console.log(obj.name); // Output: John
```

### `JSON.stringify()`: Converting a JavaScript Object to a JSON String

When you send data to a web server, the data has to be a string. `JSON.stringify()` is used to convert a JavaScript object into a JSON string.

**Example:**
```javascript
const obj = {name: "John", age: 30, city: "New York"};
const jsonString = JSON.stringify(obj);

console.log(jsonString); // Output: {"name":"John","age":30,"city":"New York"}
```

### Reading JSON Files in Node.js

There are several ways to read JSON files in Node.js. Here are the most common methods:

#### 1. Using `require()`

This is the simplest way to read a JSON file. Node.js can directly `require` JSON files. It reads the file, parses the JSON, and returns the resulting object.

**Example:**
```javascript
const myJson = require('./path/to/file.json');
console.log(myJson);
```

**Note:** When you use `require()`, the file is read only once, and the result is cached. If the JSON file changes, you won't see the changes until you restart the application.

#### 2. Using the `fs` Module

The built-in `fs` (File System) module can also be used to read JSON files. This is useful when you need to read the file multiple times without restarting the application.

**Asynchronous Read:**
```javascript
import { readFile } from "node:fs";

readFile('./path/to/file.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const jsonData = JSON.parse(data);
  console.log(jsonData);
});
```

**Synchronous Read:**
```javascript
import { readFileSync } from "node:fs";

const data = readFileSync('./path/to/file.json', 'utf8');
const jsonData = JSON.parse(data);
console.log(jsonData);
```