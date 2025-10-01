# All About NPM (Node Package Manager)

This section provides an overview of NPM (Node Package Manager), the default package manager for Node.js. NPM helps you discover, share, and use reusable code modules.

## What is NPM?

NPM is a command-line tool and an online registry of open-source JavaScript packages. It allows developers to:

-   Install, uninstall, and manage project dependencies.
-   Share their own packages with the community.
-   Define project metadata and scripts in a `package.json` file.

## `package.json`

The `package.json` file is the heart of any Node.js project. It contains metadata about the project and its dependencies.

Key fields in `package.json`:

-   `name`: The name of your project.
-   `version`: The current version of your project.
-   `description`: A brief description of your project.
-   `main`: The entry point to your application (e.g., `index.js`).
-   `scripts`: A place to define command-line scripts to automate tasks (e.g., `start`, `test`).
-   `author`: The author of the project.
-   `license`: The license under which the project is distributed.
-   `dependencies`: A list of packages required for your application to run.
-   `devDependencies`: A list of packages only needed for development and testing.
-   `type`:  Can be set to "module" to enable the use of ES6 modules (`import`/`export` syntax).

### Example `package.json`

```json
{
  "name": "learning-npm",
  "version": "1.0.0",
  "description": "I'm learning about NPM",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Harsh",
  "license": "ISC",
  "dependencies": {
    "sillyname": "^0.1.0",
    "superheroes": "^4.0.0"
  }
}
```

## Essential NPM Commands

-   `npm init`: Initializes a new Node.js project and creates a `package.json` file.
    -   `npm init -y`: Skips the interactive questionnaire and creates a `package.json` file with default values.
-   `npm install <package-name>`: Installs a package and adds it to the `dependencies` in `package.json`.
    -   Alias: `npm i <package-name>`
-   `npm install <package-name> --save-dev`: Installs a package and adds it to the `devDependencies`.
-   `npm install`: Installs all the dependencies listed in `package.json`.
-   `npm uninstall <package-name>`: Uninstalls a package and removes it from `package.json`.
-   `npm update`: Updates all packages to their latest compatible versions.
-   `npm run <script-name>`: Executes a script defined in the `scripts` section of `package.json`.

## Using NPM Packages

The `index.js` file in this directory demonstrates how to use installed NPM packages.

```javascript
// Using ES6 module syntax (enabled by "type": "module" in package.json)
import generateName from 'sillyname';
import { randomSuperhero } from 'superheroes';

const sillyName = generateName();
const superheroName = randomSuperhero();

console.log(`My name is ${sillyName}.`);
console.log(`My superhero name is ${superheroName}.`);
```

To run this code:

1.  Make sure you have installed the dependencies:
    ```bash
    npm install
    ```
2.  Execute the script:
    ```bash
    node index.js
    ```
