// Sentry initialization...

const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});

// Rest of app imports...

const express = require('express');
const app = express();

// Test error route
app.get('/test', (req, res) => {
  try {
    throw new Error('Test error');  
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).send('Test error triggered');
  }
});

// Existing routes...

app.get('/', (req, res) => {
  res.send('Hello World'); 
});


// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});
