CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email) VALUES ('Raigo-Robin Anni', 'raigorobin21@gmail.com');

UPDATE users SET email = 'raigorobin21@gmail.com' WHERE id = 1;

SELECT * FROM users;
