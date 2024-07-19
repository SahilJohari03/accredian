const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Replace with your database credentials
const pool = mysql.createPool({
  host: 'your_host',
  user: 'your_user',
  password: 'your_password',
  database: 'your_database'
});

app.use(express.json());

app.post('/referrals', (req, res) => {
  const { referrerName, referrerEmail, refereeName, refereeEmail } = req.body;

  pool.query(
    'INSERT INTO referrals (referrerName, referrerEmail, refereeName, refereeEmail) VALUES (?, ?, ?, ?)',
    [referrerName, referrerEmail, refereeName, refereeEmail],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving referral');
      } else {
        res.status(201).json({ message: 'Referral saved successfully' });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
