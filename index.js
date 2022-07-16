const express = require('express');

// Create express app
const app = express();

// Define a middleware
app.use((req, res, next) => {
  console.log('In the middleware');
  // This function must be executed to continue with the next middleware
  next();
});

// Define another middleware
app.use((req, res, next) => {
  console.log('In another middleware');
  res.send('<h1>Hello from Express!</h1>');
});

/**
 * app.listen(3000) executes the following two statements behind the scenes
 *
 * const server = http.createServer(app);
 * server.listen(3000);
 */

app.listen(3000);
