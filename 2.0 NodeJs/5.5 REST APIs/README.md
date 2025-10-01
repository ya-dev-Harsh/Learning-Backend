# REST APIs

REST (Representational State Transfer) is an architectural style for designing networked applications. It is a set of constraints to be used when creating web services. RESTful web services are web services that adhere to the REST architectural constraints.

## Key Concepts

*   **Resources:** In REST, everything is a resource. A resource can be a user, a product, or any other object. Resources are identified by URIs (Uniform Resource Identifiers).
*   **Methods:** Clients interact with resources by sending requests to the server. These requests contain a method that specifies the action to be performed on the resource. The most common methods are:
    *   `GET`: Retrieve a resource.
    *   `POST`: Create a new resource.
    *   `PUT`: Update an existing resource.
    *   `PATCH`: Partially update an existing resource.
    *   `DELETE`: Delete a resource.
*   **Representations:** Resources can have multiple representations, such as JSON or XML. The client can request a specific representation by setting the `Accept` header in the request.

## Example

This project is a simple example of a RESTful web service. It allows clients to interact with a "secret" resource. The following endpoints are available:

*   `GET /secrets/:id`: Retrieve a secret with the specified ID.
*   `POST /secrets`: Create a new secret.
*   `PUT /secrets/:id`: Update a secret with the specified ID.
*   `PATCH /secrets/:id`: Partially update a secret with the specified ID.
*   `DELETE /secrets/:id`: Delete a secret with the specified ID.

The `index.js` file contains the implementation of these endpoints. It uses the `express` framework to create the web service and the `axios` library to send requests to the [Secrets API](https.secrets-api.appbrewery.com).

The `views/index.ejs` file contains a simple web interface for interacting with the web service. It allows users to enter the ID of a secret and then perform `GET`, `POST`, `PUT`, `PATCH`, and `DELETE` operations on it.

### Code Snippets

Here are some code snippets from `index.js` that demonstrate how to implement the different REST methods:

**GET**

```javascript
app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});
```

**POST**

```javascript
app.post("/post-secret", async (req, res) => {
  try {
    const result = await axios.post(API_URL + "/secrets/" , req.body, config);
    res.render('index.ejs', { content: JSON.stringify(result.data) })
  } catch (error) {
    res.render('index.ejs', { content: JSON.stringify(error.response.data) })
  }
});
```

**PUT**

```javascript
app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.put(
      API_URL + '/secrets/' + searchId
      , req.body,
      config);
    res.render('index.ejs', { content: JSON.stringify(result.data) })
  } catch (error) {
    res.render('index.ejs', { content: JSON.stringify(error.response.data) })
  }
});
```

**PATCH**

```javascript
app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.patch(
      API_URL + '/secrets/' + searchId,
      req.body,
      config
    )
    res.render('index.ejs', { content: JSON.stringify(result.data)});
  } catch (error) {
    res.render('index.ejs', { content: JSON.stringify(error.response.data) })
  }
});
```

**DELETE**

```javascript
app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.delete(
      API_URL + '/secrets/' + searchId,
      config
    );
    res.render('index.ejs', { content: JSON.stringify(result.data) })
  } catch (error) {
    res.render('index.ejs', { content: JSON.stringify(error.response.data) })
  }
});
```
