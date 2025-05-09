const { Pool } = require("pg");

const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '12345',
    database:'E-com',
    port: 5432
});

db.connect((err)=> {
    if(err)
        console.log(err);
    else
        console.log(`DB is Connected!!!!`)
});

module.exports = db;