import bodyParser from "body-parser";
import express from "express";
import pg from "pg";

// Connect to the database using the DATABASE_URL environment
//   variable injected by Railway
const pool = new pg.Pool();

const app = express();
const port = process.env.PORT || 3333;

app.use(bodyParser.json());
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
app.use(bodyParser.text({ type: "text/html" }));

app.get("/bicicletas", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM bicicletas");

  res.send(rows);
});

app.get("/cascos", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM cascos");

  res.json(rows);
});

app.get("/", async (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
