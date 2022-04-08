// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres Client Setup
const { Pool } = require('pg');
const pgClient = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.PG_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.PG_PORT
});

pgClient.on('error', () => console.log('Lost PG connection'));

pgClient
  .query('CREATE TABLE IF NOT EXISTS doctors (id SERIAL PRIMARY INT, name VARCHAR(50) NOT NULL)')
  .catch(err => console.log(err));

pgClient
  .query('CREATE TABLE IF NOT EXISTS patients (id SERIAL PRIMARY INT, name VARCHAR(50) NOT NULL)')
  .catch(err => console.log(err));
pgClient

  .query('CREATE TABLE IF NOT EXISTS appointments (id SERIAL PRIMARY INT, doctor_id INT NOT NULL, patient_id INT NOT NULL, datetime timestamp NOT NULL)')
  .catch(err => console.log(err));
// Express route handlers

app.get('/', (req, res) => {
  res.send("hi");
});

app.get('/values/all', async (req, res) => {
  const values = await pgClient.query('SELECT * from patients');

  res.send(values.rows);
});

app.post('/values', async (req, res) => {
  const name = req.body.name;

  pgClient.query('INSERT INTO doctors(name) VALUES($1)', [name]);

  res.send({ working: true });
});

app.listen(5000, err => {
  console.log('Listening at port: ' + "5000");
});




