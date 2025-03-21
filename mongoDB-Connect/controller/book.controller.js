const Book = require('../model/book.model');
const path = require('path');
const fs = require('fs');

exports.getAllBooks = async (req, res) => {
    try {
        console.log(req.query);
        let allBooks;
        if(req.query.search){
            allBooks = await Book.find({
                $or:[
                    {
                        title: req.query.search
                    },
                    {
                        category: req.query.search
                    },
                    {
                        
                    }
                ]
            })
        }else if(req.query.category){
            allBooks = await Book.find({category: req.query.category})
        }else{

            allBooks = await Book.find();
        }
        // console.log(allBooks);
        return res.render('book', { allBooks });
    } catch (err) {
        console.log(err);
        return res.redirect("back")
    }
}


exports.addBook = async (req, res) => {
    // console.log(req.body);
    // console.log(req.file)
    try {
        let imagePath = ""
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`
        }
        req.body.productImg = imagePath;

        let newBook = await Book.create(req.body);
        if (newBook) {
            return res.redirect("/");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back")
    }
}

exports.deleteBook = async (req, res) => {
    try {
        let id = req.params.id;
        let record = await Book.findById(id);
        // console.log(record);
        if (record.productImg != "") {
            let imagePath = path.join(__dirname, "..", record.productImg);
            // console.log(imagePath)
            try {
                await fs.unlinkSync(imagePath);
            } catch (error) {
                console.log('File Missing....');
            }
        }
        record = await Book.findByIdAndDelete(id);

        if (record) {
            console.log("Delete Sucess");
            return res.redirect("/")
        } else {
            console.log('Errror');
            return res.redirect("back");
        }
    }catch(err){
        console.log(err)
        return res.redirect("back");
    }
};


exports.editBook = async (req, res) => {
    let record = await Book.findById(req.params.id);
    return res.render("editBook", { book: record })
}

exports.updateBook = async (req, res) => {
    let record = await Book.findById(req.params.id);
    if (record) {
        if (req.file) {
            if (record.productImg != "") {
                let imagePath = path.join(__dirname, "..", record.productImg);
                try {
                    await fs.unlinkSync(imagePath);
                } catch (error) {
                    console.log('File Missing....');
                }
            }
            imagePath = `/uploads/${req.file.filename}`
            req.body.productImg = imagePath;
        }
        await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log("Update Success");
        return res.redirect("/");
    } else {
        return res.redirect("back");
    }
}