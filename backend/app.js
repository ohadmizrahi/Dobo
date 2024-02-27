const path = require('path');
const express = require('express');

require('module-alias').addAliases({
  '@src': path.resolve(__dirname, 'src'),
  '@be': path.resolve(__dirname),
  // Add more aliases as needed
});

const pool = require('@be/database/pool.js');

const authRouter = require('@src/routes/auth');
const profileRouter = require('@src/routes/profile.js');

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database at:', res.rows[0].now);
  }
});

const app = express();
const port = process.env.BE_PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// To handle requestes for secondRouter
app.use(authRouter)

// To handle requestes for secondRouter
app.use(profileRouter)

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(port, () => {
  console.log(`Server is running on  http://localhost:${port}`);
});
