const express = require('express');
const port = 8005;
const server = express();
const path = require('path')

server.set("view engine", 'ejs');
server.use(express.urlencoded())

server.use("/", express.static(path.join(__dirname, "public")))

let middleware = (req, res, next) => {
    if(req.query.age >= 18){
        next();
    }else{
        return res.send('Your age is below 18....')
    }
}

// server.use(middleware);

let users = [
    {
        id: '11',
        firstname: "John",
        lastname: "Peter",
        email: 'john@test.in',
        phone: '122344'
    },
    {
        id: '12',
        firstname: "Jolly",
        lastname: "Peter",
        email: 'jolly@test.in',
        phone: '9858957'
    },
    {
        id: '13',
        firstname: "Smith",
        lastname: "Peter",
        email: 'smith@test.in',
        phone: '7584857'
    },
];



server.get("/",  (req, res) => {
    // res.render('index', { users });
    return res.render('dashboard')
})

server.get("/form", (req, res) => {
    return res.render('form')
})

server.post("/add-user", (req, res) => {
    // console.log(req.body);
    users.push(req.body);
    return res.redirect("/");
})

server.get("/delete/:id", (req, res) => {
    // console.log(req.params.id);
    let id = req.params.id;

    let updateRecord = users.filter(user => user.id != id)
    users = updateRecord;
    return res.redirect("/");
})

server.get("/edit/:id", (req, res) => {
    // console.log(req.params.id);
    let id = req.params.id;
    let record = users.find(user => user.id == id);
    return res.render('edit', {user: record})
})

server.post("/edit-user/:id", (req, res) => {
    let id = req.params.id;
    let updateData = users.map(user => {
        if(user.id == id){
            return {...req.body, id}
        }else{
            return user;
        }
    })

    users = updateData;
    return res.redirect("/")
})



server.listen(port, () => {
    console.log(`Server start at http://localhost:8005`);
})