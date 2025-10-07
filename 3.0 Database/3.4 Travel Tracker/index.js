import express from "express";
import bodyParser from "body-parser";
import pg from'pg';

const db = new pg.Client({
  user:"postgres",
  host:"localhost",
  database:"World",
  password:"Harsh_2323490",
  port: 5432
});

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

db.connect();

app.get("/", async (req, res) => {
  const result = await db.query("SELECT country_code FROM visited_country");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code)
  });
  res.render("index.ejs", { countries: countries, total: countries.length })
  db.end();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
