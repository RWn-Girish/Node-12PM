const express = require("express");
const port = 8005;
const db = require('./config/dbConnection');
const path = require('path');

const app = express();

app.set("view engine", 'ejs');
app.use(express.urlencoded());
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use("/", require("./routes/book.routes"));
// app.use("/users", require("./routes/users.routes"));

app.listen(port, () => {
    console.log(`Server start at http://localhost:8005`)
});