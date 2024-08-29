import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost', // Your database host
  user: 'root', // Your database username
  password: 'Dasun123', // Your database password
  database: 'crypto-userbase', // Your database name
});

export default pool;
