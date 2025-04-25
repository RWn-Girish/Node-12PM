const express = require('express');
const port = 8001;
const app = express();
const dbConnect = require("./config/dbConnection");

// middleware
app.use(express.urlencoded());


// routes
app.use("/", require("./routes/index.routes"));

app.listen(port, ()=> {
    console.log(`Server start at http://localhost:${port}`);
})
