const path = require('path');
const express = require('express');

require('module-alias').addAliases({
  '@src': path.resolve(__dirname, 'src'),
  '@be': path.resolve(__dirname),
  // Add more aliases as needed
});

const firstRouter = require('@src/routes/route1');
const secondRouter = require('@src/routes/route2');
const pool = require('@be/database/pool.js');

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database at:', res.rows[0].now);
  }
});

const app = express();
const port = process.env.BE_PORT || 3000;

// To handle requestes for firstRouter
app.use(firstRouter)

// To handle requestes for secondRouter
app.use(secondRouter)

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(port, () => {
  console.log(`Server is running on  http://localhost:${port}`);
});
