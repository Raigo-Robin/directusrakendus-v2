// Sentry
const Sentry = require('@sentry/node'); 
Sentry.init({
  dsn: process.env.SENTRY_DSN
});

// MySQL
const mysql = require('mysql2/promise');
const db = await mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: {
    rejectUnauthorized: true 
  }
});

// Test MySQL
await db.query('SELECT 1');

// Pass MySQL connection to Directus
// ...

// Start Directus
directusStart();

// Express app
const app = require('express')(); 

// Routes...

// Error test route
app.get('/error', () => {
  throw new Error('Test error');
});

// Error handler
app.use(Sentry.Handlers.errorHandler());

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`) 
});
