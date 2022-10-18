import * as mysql from "mysql";

//////////////// Connection and Set Up ////////////////////////////////////////////////////////////////
const sql_db = process.env["SQL_DB"];
const sql_user = process.env["SQL_USER"];
const sql_pass = process.env["SQL_PASS"];
const sql_host = process.env["SQL_HOST"];

// it is necessary to make a pool, because mysql gets upset sometimes if it runs for too long
const con = mysql.createPool({
  connectionLimit: 10,
  host: sql_host,
  user: sql_user,
  password: sql_pass,
  database: sql_db,
});

/*
  con.connect(function (err) {
      if (err) throw err;
      console.log("Connected to local SQL!");
      connectedToLocalSQL = true;
  });
  */
con.on("connection", function (connection) {
  console.log("DB Connection established");

  connection.on("error", function (err) {
    console.error(new Date(), "MySQL error", err.code);
  });
  connection.on("close", function (err) {
    console.error(new Date(), "MySQL close", err);
  });
});

con.query(
  "CREATE TABLE IF NOT EXISTS practices ( \
  id INT AUTO_INCREMENT, \
  driver_signup_id INT NOT NULL, \
  user_id INT NOT NULL, \
  leave_time DATETIME, \
  PRIMARY KEY (id) \
)"
);
con.query(
  "CREATE TABLE IF NOT EXISTS sign_ups ( \
  id INT NOT NULL AUTO_INCREMENT, \
  user_id INT NOT NULL, \
  timestamp DATETIME, \
  car_capacity INT NOT NULL, \
  leave_time DATETIME, \
  PRIMARY KEY (id) \
)"
);
con.query(
  "CREATE TABLE IF NOT EXISTS practices ( \
  id INT AUTO_INCREMENT, \
  driver_signup_id INT NOT NULL, \
  driver_id INT NOT NULL, \
  user_signup_id INT NOT NULL, \
  user_id INT NOT NULL, \
  leave_time DATETIME, \
  is_verified INT NOT NULL \
  PRIMARY KEY (id) \
)"
);

export default con;
