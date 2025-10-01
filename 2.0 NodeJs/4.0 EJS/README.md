# Introduction to EJS (Embedded JavaScript)

EJS is a simple templating language that lets you generate HTML markup with plain JavaScript. It allows you to embed JavaScript code inside your HTML to create dynamic content.

## Why Use a Templating Engine?

When building web applications, you often need to send HTML that contains dynamic data from your server. Instead of manually constructing large HTML strings in your JavaScript code, templating engines like EJS provide a cleaner and more maintainable way to separate your application logic from your presentation layer (the HTML).

## Setting Up EJS with Express

To use EJS with Express, you need to:

1.  **Install `ejs`**:
    ```bash
    npm install ejs
    ```

2.  **Set EJS as the View Engine**: Express has a `view engine` setting that allows you to specify the templating engine you want to use. By default, Express looks for template files in a `views` directory in your project's root.

    *(Note: In this project, Express automatically sets EJS as the view engine because the `ejs` package is installed and we are using `res.render` with a `.ejs` file. For more complex projects, you might explicitly set it with `app.set('view engine', 'ejs');`)*

## Passing Data to EJS Templates

The core feature of EJS is passing data from your server-side code to your HTML templates. This is done using the `res.render()` method in Express.

### Code Overview (`index.js`)

```javascript
import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const today = new Date();
    const day = today.getDay(); // 0 for Sunday, 6 for Saturday

    let type = "a weekday";
    let adv = "it's time to work hard";

    if (day === 0 || day === 6) {
        type = "the weekend";
        adv = "it's time to have fun";
    }

    // Render the EJS template and pass data as an object
    res.render("index.ejs", {
        dayType: type,
        advice: adv,
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
```
In this code, we pass an object `{ dayType: type, advice: adv }` to the `index.ejs` template.

### EJS Template (`views/index.ejs`)

The EJS template receives the data and uses special tags to embed the values into the HTML.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>EJS</title>
</head>
<body>
    <h1>Hey, it's <%= dayType %>, <%= advice %>!</h1>
</body>
</html>
```

## Common EJS Tags

EJS uses tags to embed JavaScript. Here are the most common ones (as listed in `Tags.txt`):

-   `<%= expression %>`: **Outputs** the value of the expression into the HTML (HTML-escaped). This is the most common tag and is safe for displaying user-provided data.
-   `<%- expression %>`: **Outputs** the raw, unescaped value of the expression. Use this if you want to render HTML content stored in a variable.
-   `<% code %>`: **Scriptlet tag**. Executes the JavaScript code inside it. Used for control flow like loops (`for`) and conditionals (`if`).
-   `<%# comment %>`: A comment tag. The content is ignored.
-   `<%- include('filename') %>`: Includes another EJS file. Useful for creating partials (reusable template snippets like headers and footers).

## How to Run

1.  **Install Dependencies**: `npm install`
2.  **Start Server**: `node index.js`
3.  **View in Browser**: Go to `http://localhost:3000`. The message will change depending on whether it's a weekday or the weekend.
