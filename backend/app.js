const path = require('path');
const express = require('express');

require('module-alias').addAliases({
  '@src': path.resolve(__dirname, 'src'),
  // Add more aliases as needed
});

const firstRouter = require('@src/routes/route1');
const secondRouter = require('@src/routes/route2');

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
