import "./config.js";
import express from "express";

import api from "./api/index.js";
import authRouter from "./routes/auth.js";

const mysql = require('mysql');

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/", authRouter);
app.use("/practice", api.practice);
app.use("/signup", api.signup);
app.use("/users", api.users);


// putting sql stuff here for now, we can move it to a different module later if desired
//////////////// Connection and Set Up ////////////////////////////////////////////////////////////////
var con; //connection to sql
const sql_db = "X_MARKS_SPOT";
// connect to SQL if anybody is using it

connectLocalSQL();

// creates a connection to the SQL database
async function connectLocalSQL() {
    let sql_user, sql_pass;

    // todo put conditional statements here if you're using different local mysqls
    sql_user = CAESAR_SQL_USER;
    sql_pass = CAESAR_SQL_PASS;

    // it is necessary to make a pool, because mysql gets upset sometimes if it runs for too long
    con = mysql.createPool({
        connectionLimit: 10,
        host: "localhost",
        user: sql_user,
        password: sql_pass,
        database: sql_db
    });

    /*
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected to local SQL!");
        connectedToLocalSQL = true;
    });
    */
    con.on('connection', function (connection) {
        console.log('DB Connection established');

        connection.on('error', function (err) {
            console.error(new Date(), 'MySQL error', err.code);
        });
        connection.on('close', function (err) {
            console.error(new Date(), 'MySQL close', err);
        });

    });
}



app.listen(port, () => {
  console.log(`Started server on port http://localhost:${port}/`);
});
