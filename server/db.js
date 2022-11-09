import mysql2 from "mysql2/promise";

// Load variables from dotenv
const sql_db = process.env["SQL_DB"];
const sql_user = process.env["SQL_USER"];
const sql_pass = process.env["SQL_PASS"];
const sql_host = process.env["SQL_HOST"];

// it is necessary to make a pool, because mysql gets upset sometimes if it runs for too long
const con = mysql2.createPool({
  connectionLimit: 10,
  host: sql_host,
  user: sql_user,
  password: sql_pass,
  database: sql_db,
});

// Debugging connection
con.on("connection", function (connection) {
  console.log("DB Connection established");
  connection.on("error", function (err) {
    console.error(new Date(), "MySQL error", err.code);
  });
  connection.on("close", function (err) {
    console.error(new Date(), "MySQL close", err);
  });
});

// Create tables in MySQL database, if they don't already exist.
Promise.all([
  con.query(
    "CREATE TABLE IF NOT EXISTS users ( \
      user_id INT AUTO_INCREMENT, \
      google_id VARCHAR(255) UNIQUE, \
      username TEXT, \
      email TEXT, \
      pfp TEXT, \
      isadmin INT DEFAULT 0, \
      phonenumber text, \
      PRIMARY KEY (user_id) \
    )"
  ),
  con.query(
    "CREATE TABLE IF NOT EXISTS sign_ups ( \
      id INT NOT NULL AUTO_INCREMENT, \
      user_id INT NOT NULL, \
      timestamp DATETIME, \
      car_capacity INT NOT NULL DEFAULT 0, \
      leave_time DATETIME, \
      PRIMARY KEY (id) \
    )"
  ),
  con.query(
    "CREATE TABLE IF NOT EXISTS practices ( \
      id INT AUTO_INCREMENT, \
      driver_signup_id INT NOT NULL DEFAULT 0, \
      driver_id INT NOT NULL DEFAULT 0, \
      user_signup_id INT NOT NULL, \
      user_id INT NOT NULL, \
      leave_time DATETIME, \
      is_verified INT NOT NULL DEFAULT 0, \
      PRIMARY KEY (id) \
    )"
  ),
])
  .then(() => console.log("Configured databases"))
  .catch((err) => console.error(err));

export default con;
