# Exploring EJS Tags

This project provides a hands-on demonstration of the most commonly used EJS (Embedded JavaScript) tags. It builds on the basic concepts of EJS and shows how to use tags for control flow, outputting data, and including partial templates.

## Data Passed to the Template

The `index.js` file passes the following data object to the `index.ejs` template:

```javascript
const data = {
  title: "EJS Tags",
  seconds: new Date().getSeconds(),
  items: ["apple", "banana", "cherry"],
  htmlContent: "<strong>This is some strong text</strong>",
};
res.render("index.ejs", data);
```

## EJS Tags in Action (`views/index.ejs`)

The `index.ejs` file uses this data to showcase different tags:

### 1. Scriptlet Tag: `<% ... %>`

The scriptlet tag is used to execute JavaScript code that doesn't produce any output. It's primarily used for control flow, such as conditionals (`if/else`) and loops (`for`, `forEach`).

**Example:**
-   An `if` statement checks if the current second is an even number.
-   A `forEach` loop iterates over the `items` array.

```ejs
<% if (seconds % 2 === 0) { %>
  <ul>
    <% items.forEach((fruit) => { %>
      <li>
        <%= fruit %>
      </li>
    <% }) %>
  </ul>
<% } else { %>
  <p>No items to display</p>
<% } %>
```

### 2. Output Tag (Escaped): `<%= ... %>`

This is the most frequently used tag. It outputs the value of a JavaScript expression into the HTML. Importantly, it **escapes** the output, meaning it converts special HTML characters (like `<` and `>`) into their safe, displayable equivalents (e.g., `&lt;` and `&gt;`). This is a crucial security feature to prevent Cross-Site Scripting (XSS) attacks when displaying user-generated content.

**Example:**
```ejs
<p>Current second: <%= seconds %></p>
<li><%= fruit %></li>
```

### 3. Output Tag (Unescaped): `<%- ... %>`

This tag also outputs the value of a JavaScript expression, but it does **not** escape the content. It renders the raw data. This should be used with caution and only with trusted content. It's useful when you intentionally want to render HTML that is stored in a variable.

**Example:**
The `htmlContent` variable (`"<strong>This is some strong text</strong>"`) is rendered as bold text.

```ejs
<p><%- htmlContent %></p>
```
If we had used `<%= htmlContent %>` instead, the browser would have displayed the literal string `<strong>This is some strong text</strong>` instead of rendering it as bold text.

### 4. Include Tag: `<%- include(...) %>`

The `include` tag is used to embed other EJS files (known as "partials") into the current template. This is extremely useful for reusing common layout elements like headers, footers, and navigation bars across multiple pages.

**Example:**
The contents of `footer.ejs` are rendered at the bottom of the page.

```ejs
<%- include("footer.ejs") %>
```

## How to Run

1.  **Install Dependencies**: `npm install`
2.  **Start Server**: `node index.js`
3.  **View in Browser**: Go to `http://localhost:3000`. Refresh the page to see the content change based on whether the current second is even or odd.
