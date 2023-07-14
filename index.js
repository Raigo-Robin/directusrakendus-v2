// Sentry 
const Sentry = require('@sentry/node');
Sentry.init({
  dsn: process.env.SENTRY_DSN
});

// MySQL
const mysql = require('mysql2/promise');

// Create MySQL connection
const db = await mysql.createConnection({ 
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER, 
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: {
    rejectUnauthorized: true
  }
});

// Test MySQL connection 
await db.query('SELECT 1');

// Directus
require('./directus')(); 

// Express app
const app = require('express')();

// Routes... 

// Sentry error handling middleware
app.use(Sentry.Handlers.errorHandler());

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});
