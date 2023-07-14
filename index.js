// Environment
require('dotenv').config();

// Sentry
const Sentry = require('@sentry/node');
Sentry.init({
  dsn: process.env.SENTRY_DSN  
});

// MySQL
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER, 
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: true
});

connection.connect(err => {
  if (err) {
    console.error('MySQL connection error: ' + err.stack);
    return;
  }
  
  console.log('Connected to MySQL!');
  
  connection.query('SELECT 1', (err, results) => {
    if (err) throw err;
    console.log('Query test: ' + results); 
  });
});

// Directus
const directus = require('@directus/sdk');
directus.createApp({
  database: {
    client: 'mysql',
    connection: connection
  }
})

// Express
const app = require('express')();

app.get('/error', () => {
  throw new Error('Test error'); 
});

app.use(Sentry.Handlers.errorHandler());

const port = 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
