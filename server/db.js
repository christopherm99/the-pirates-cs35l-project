import * as mysql from "mysql";

//////////////// Connection and Set Up ////////////////////////////////////////////////////////////////
const sql_db = "X_MARKS_SPOT";
// todo put conditional statements here if you're using different local mysqls
const sql_user = process.env["CAESAR_SQL_USER"];
const sql_pass = process.env["CAESAR_SQL_PASS"];
const sql_host = process.env["CAESAR_SQL_HOST"];

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

export default con;
