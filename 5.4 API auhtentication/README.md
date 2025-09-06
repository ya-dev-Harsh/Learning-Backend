# API Authentication and Authorization

This project demonstrates various methods of API authentication and authorization using a simple Express.js server. The server interacts with the [Secrets API](https://secrets-api.appbrewery.com/) to fetch data, each endpoint requiring a different authentication strategy.

## Key Concepts

### Authentication vs. Authorization

*   **Authentication** is the process of verifying who a user is. It's like checking an ID to ensure the person is who they claim to be. In the context of APIs, this often involves credentials like usernames, passwords, API keys, or tokens.

*   **Authorization** is the process of verifying what a user has permission to do. Once a user is authenticated, authorization determines what resources they can access or what actions they can perform. It's like having a ticket for a specific seat at a concert; you're allowed in the venue (authenticated), but you can only access that specific seat (authorized).

## Authentication Methods Explained

This project implements the following common authentication methods:

### 1. No Authentication

*   **Endpoint:** `/noAuth`
*   **API Route:** `/random`

This endpoint requires no authentication. It's an open endpoint that provides a random secret. This is suitable for public data that doesn't require any user-specific access control.

### 2. Basic Authentication

*   **Endpoint:** `/basicAuth`
*   **API Route:** `/all?page=2`

This is one of the simplest forms of authentication. The client sends a `Authorization` header with the word "Basic" followed by a space and a base64-encoded string of `username:password`.

**Pros:** Simple to implement.
**Cons:** Not very secure as the credentials are only encoded, not encrypted, and are sent with every request.

### 3. API Key

*   **Endpoint:** `/apiKey`
*   **API Route:** `/filter?score=5&apiKey=<YOUR_API_KEY>`

In this method, the client is issued an API key (a unique string) which is sent to the server with each request, typically as a query parameter or in a request header. The server validates the key to authenticate the client.

**Pros:** Simple and allows for usage tracking and throttling.
**Cons:** Can be insecure if the key is exposed on the client-side.

### 4. Bearer Token

*   **Endpoint:** `/bearerToken`
*   **API Route:** `/secrets/42`

This method involves a token (usually a long, encrypted string) that is sent in the `Authorization` header with the prefix "Bearer ". The client first authenticates with a server to obtain this token (often via a login process like OAuth). The token is then sent with subsequent requests to access protected resources.

**Pros:** More secure than Basic Auth or simple API keys, as the user's actual credentials are not sent with every request. Tokens can also have limited lifetimes and specific scopes of access.
**Cons:** More complex to implement initially.

## Project Structure

*   `index.js`: The main server file containing the Express.js server and the different authentication routes.
*   `views/index.ejs`: The view file that renders the HTML content and provides buttons to test the different authentication methods.
*   `package.json`: The project's dependencies and scripts.

## How to Run

1.  Install the dependencies: `npm install`
2.  Fill in your authentication credentials in `index.js` for the `yourUsername`, `yourPassword`, `yourAPIKey`, and `yourBearerToken` variables.
3.  Run the server: `node index.js`
4.  Open your browser and navigate to `http://localhost:3000` to interact with the application.
