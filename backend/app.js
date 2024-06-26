require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');

const PORT = process.env.BE_PORT || 3000;

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  methods: "GET, POST",
  allowedHeaders: "Content-Type, Authorization" 
};

require('module-alias').addAliases({
  '@src': path.resolve(__dirname, 'src'),
  '@be': path.resolve(__dirname),
  // Add more aliases as needed
});

const pool = require('@be/connections/postgres.js');

const { swaggerUi, swaggerSpec } = require('@be/docs/docs.js');

const authRouter = require('@src/routes/auth');
const profileRouter = require('@src/routes/profile.js');
const tableRouter = require('@src/routes/table.js');
const homeRouter = require('@src/routes/home.js');

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.info('Connected to the database at:', res.rows[0].now);
  }
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use('/assets', express.static('assets'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// To handle requestes for authRouter
app.use(authRouter)

// To handle requestes for homeRouter
app.use(homeRouter)

// To handle requestes for profileRouter
app.use(profileRouter)

// To handle requestes for tableRouter
app.use(tableRouter)


app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}`);
});
