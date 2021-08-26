const express = require("express");
const app = express();
const pool = require("./database");

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Docker is easy 🐳" });
});

app.get("/quotes", async (req, res) => {
  try {
    // Get connection
    const connection = await pool.getConnection();

    // Create new query
    const query = `SELECT * FROM quotes`;

    // Executing query
    const quotes = await connection.query(query);

    // const quotes = [
    //   {
    //     quote: "Be yourself; everyone else is already taken",
    //     author: "Oscar Wilde",
    //   },
    //   {
    //     quote:
    //       "I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.",
    //     author: "Marilyn Monroe",
    //   },
    //   {
    //     quote:
    //       "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
    //     author: "Albert Einstein",
    //   },
    //   {
    //     quote: "A room without books is like a body without a soul.",
    //     author: "Marcus Tullius Cicero",
    //   },
    // ];

    res.status(200).json({ quotes });
  } catch (error) {
    console.error(error);
  }
});

app.post("/quotes", async (req, res) => {
  try {
    // Get connection
    const connection = await pool.getConnection();

    // Create new query
    const query = `INSERT INTO quotes value (?, ?)`;

    // Executing query
    const result = await connection.query(query, [
      req.body.author,
      req.body.quote,
    ]);

    // Response to the client
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
  }
});

const port = process.env.PORT || 8080;

app.listen(port, () =>
  console.log(`app listening on http://localhost:${port}`)
);
