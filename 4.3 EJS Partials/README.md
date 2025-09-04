# EJS Partials

EJS partials allow you to create reusable snippets of code, HTML, or any text that can be included in other EJS templates. This is a powerful feature for keeping your code organized, maintainable, and DRY (Don't Repeat Yourself). Partials are ideal for common page elements like headers, footers, navigation bars, and sidebars.

## Key Concepts

*   **Modularity**: Partials break down your views into smaller, manageable components.
*   **Reusability**: Define a piece of code once and reuse it in multiple places.
*   **Maintainability**: When you need to update a common element, you only have to edit the partial file.

## How to Use EJS Partials

The `<%- include('path/to/partial.ejs') %>` syntax is used to include a partial in a template.

*   **`<%- ... %>`**: Unescaped output tag. This is important to render raw HTML from the partial file.
*   **`include()`**: The function that tells EJS to render the specified partial.
*   **`'path/to/partial.ejs'`**: The path to the partial file, relative to the template file where you are calling it.

## Example

A common use case is to have a `partials` directory inside your `views` directory.

```
views/
├── partials/
│   ├── header.ejs
│   └── footer.ejs
├── index.ejs
└── about.ejs
```

**`views/partials/header.ejs`:**
```html
<header>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</header>
```

**`views/index.ejs`:**
```ejs
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Home Page</title>
</head>
<body>
  <%- include('partials/header.ejs') %>
  <h1>Welcome to the Home Page!</h1>
  <%- include('partials/footer.ejs') %>
</body>
</html>
```

## Passing Data to Partials

You can pass data to partials using the following syntax:
`<%- include('path/to/partial.ejs', {key: value}) %>`

The second argument is an object where each key-value pair becomes a variable available in the partial's scope.
