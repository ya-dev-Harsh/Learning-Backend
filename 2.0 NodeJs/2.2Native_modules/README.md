# Node.js Native Modules: File System (fs)

This section explores the use of Node.js native modules, focusing on the `fs` (File System) module for interacting with the file system.

## The `fs` Module

The `fs` module is a built-in Node.js module that provides an API for interacting with the file system. It allows you to perform operations such as reading, writing, updating, and deleting files.

### Key `fs` Module Operations

The code in this directory demonstrates two common `fs` operations:

1.  **Writing to a File (`fs.writeFile`)**: This function asynchronously writes data to a file, replacing the file if it already exists.

    ```javascript
    const fs = require("fs");

    fs.writeFile("message.txt", "Hello from Node.js!!", (err) => {
        if (err) throw err;
        console.log("File has been created");
    });
    ```

    -   `"message.txt"`: The name of the file to be created or overwritten.
    -   `"Hello from Node.js!!"`: The data to be written to the file.
    -   `(err) => { ... }`: A callback function that is executed once the file has been written. If an error occurs, the `err` object will contain information about the error.

2.  **Reading from a File (`fs.readFile`)**: This function asynchronously reads the entire contents of a file.

    ```javascript
    const fs = require("fs");

    fs.readFile("message.txt", 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
    });
    ```

    -   `"message.txt"`: The name of the file to be read.
    -   `'utf8'`: The encoding of the file. This is important to ensure the file content is read correctly as a string.
    -   `(err, data) => { ... }`: A callback function that is executed once the file has been read. If an error occurs, the `err` object will be populated. If successful, the `data` argument will contain the contents of the file.

### Running the Code

To see the `fs.readFile` function in action, you can run the `index.js` file:

```bash
node index.js
```

This will output the content of `message.txt` to the console.
