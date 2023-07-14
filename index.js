// Environment
require('dotenv').config();

// Sentry 
Sentry.init({
  dsn: process.env.SENTRY_DSN
});

// MySQL
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: true 
});

connection.connect(err => {
  // Test connection  
});

// Directus
const directus = require('@directus/sdk');
directus.createApp({
  database: {
    client: 'mysql', 
    connection: connection
  }
});

// App
const app = require('express')();

// Error handling
app.use(Sentry.Handlers.errorHandler());

// Server
const port = 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
