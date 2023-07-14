// Initialize Sentry as early as possible 
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV  
});

// Rest of app imports...
const express = require('express');
const app = express();

// Capture unhandled rejections
process.on('unhandledRejection', error => {
  Sentry.captureException(error);
});

// API routes...
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/error', (req, res) => {
  throw new Error('Example error'); 
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});
