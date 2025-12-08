import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from 'bcrypt';

const app = express();
const port = 3000;
const salt_Rounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
 user: "postgres",
  host: "localhost",
  database: "World",
  password: "Harsh_2323490",
  port: 5432,
});
db.connect();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM userss WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      bcrypt.hash(password, salt_Rounds, async (err, hash) => {
        if (err) {
          console.lerror("Error in hashing: ", err);
        } else {
          console.log("Hashed Password:", hash);
          await db.query(
            "INSERT INTO userss (email, password) VALUES ($1, $2)",
            [email, hash]
          );

          res.render("login.ejs");
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const login_password = req.body.password;

  try {
    const result = await db.query("SELECT * FROM userss WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const stored_Hash_Password = user.password;
      // Check hashed password 
      bcrypt.compare(login_password, stored_Hash_Password, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
        } else {
          if (result) {
            res.render("secrets.ejs");
          } else {
            res.send("Incorrect Password");
          }
      }
    })
    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
