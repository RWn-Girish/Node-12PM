const express = require('express');

const port = 8001;
const app = express();
const db = require("./config/dbConnection");
const Book = require('./models/book');

app.set("view engine", 'ejs');
app.use(express.urlencoded())

app.get("/", async (req, res) => {
    let books = await Book.find();
    // console.log(books);
    return res.render("index", { books });
})

app.post("/add-book", async (req, res) => {
    // console.log(req.body);
    let book = await Book.create(req.body)
    if (book) {
        console.log("Added Success....");
        return res.redirect("/")
    } else {
        console.log('Somthing Error....');
        return res.redirect("back");
    }
})

app.get("/delete/:id", async(req, res) => {
    let id = req.params.id;
    await Book.findByIdAndDelete(id)
    console.log("Delete Success");
    return res.redirect("/")
})


app.listen(port, () => {
    console.log(`Server start at http://localhost:8001`);
})