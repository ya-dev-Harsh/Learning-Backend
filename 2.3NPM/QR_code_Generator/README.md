# QR Code Generator

This project is a command-line application that generates a QR code from a URL provided by the user.

## How it Works

The application uses the following NPM packages:

-   `inquirer`: To prompt the user for input (the URL).
-   `qr-image`: To generate the QR code image from the provided URL.

It also uses the native Node.js `fs` module to save the generated QR code image to a file and to log the user-provided URL.

### The Process

1.  The user is prompted to enter a URL in the command line.
2.  The application takes the URL and uses the `qr-image` package to create a QR code image.
3.  The generated QR code is saved as a PNG file named `qr-img.png`.
4.  The URL entered by the user is saved to a text file named `URL.text`.

## Code Overview (`index.js`)

```javascript
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
      message: "Type your URL",
      name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;

    // Generate QR code
    const qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream('qr-img.png'));

    // Save URL to a text file
    fs.writeFile("URL.text", url, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
```

## How to Run the Application

1.  **Install Dependencies**: Navigate to this directory in your terminal and run the following command to install the necessary packages:
    ```bash
    npm install
    ```

2.  **Run the Application**: Execute the main script using Node.js:
    ```bash
    node index.js
    ```

3.  **Enter URL**: You will be prompted to type in a URL. Enter the URL and press Enter.

4.  **Check the Output**:
    -   A new file named `qr-img.png` will be created in the directory. This is your QR code.
    -   The `URL.text` file will be updated with the URL you entered.

## Dependencies

-   `inquirer`: A collection of common interactive command-line user interfaces.
-   `qr-image`: A QR code generator.
