# Blog API Project

This project is a simple blog API with a front-end client.

## Description

The project consists of two parts:
- A back-end API server built with Express.js, which provides CRUD functionality for blog posts.
- A front-end web application built with Express.js and EJS, which consumes the API to display and manage blog posts.

## Getting Started

### Prerequisites

- Node.js and npm should be installed on your machine.

### Installation

1. Clone the repository.
2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. **Start the back-end API server:**
   ```bash
   node index.js
   ```
   The API server will be running at `http://localhost:4000`.

2. **Start the front-end server:**
   ```bash
   node server.js
   ```
   The front-end application will be accessible at `http://localhost:3000`.

## API Endpoints

The following endpoints are available on the API server (`http://localhost:4000`):

| Method | Endpoint      | Description                 |
|--------|---------------|-----------------------------|
| GET    | `/posts`      | Get all blog posts          |
| GET    | `/posts/:id`  | Get a specific blog post    |
| POST   | `/posts`      | Create a new blog post      |
| PATCH  | `/posts/:id`  | Update a specific blog post |
| DELETE | `/posts/:id`  | Delete a specific blog post |

## Dependencies

- `axios`: For making HTTP requests from the front-end to the back-end.
- `body-parser`: For parsing request bodies.
- `ejs`: As the templating engine for the front-end.
- `express`: As the web framework for both the front-end and back-end.
