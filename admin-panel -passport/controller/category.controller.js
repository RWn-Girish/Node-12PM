const Category = require("../models/category.model");

exports.viewCategory = async (req, res) => {
    try {
        let categories = await Category.find();
        return res.render("category/view_category", {categories});
    } catch (error) {
        console.log("Somthing Wrong ===> ", error);
        req.flash("error", "Somthing Wrong!!!");
        return res.redirect("back");
    }
}
exports.addCategoryPage = async (req, res) => {
    try {
        return res.render("category/add_category");
    } catch (error) {
        console.log("Somthing Wrong ===> ", error);
        req.flash("error", "Somthing Wrong!!!");
        return res.redirect("back");
    }
}


exports.addCategory = async (req, res) => {
    try {
        let imagePath = "";
        if(req.file){
            imagePath = `/uploads/category/${req.file.filename}`;
        }
        req.body.categoryImage = imagePath;

        let category = await Category.create(req.body);
        if(category){
            req.flash("success", "New Category Added!!!");
            return res.redirect("back");
        }else{
            req.flash("error", "Somthing Wrong");
            return res.redirect("back");
        }
        
    } catch (error) {
        console.log("Somthing Wrong ===> ", error);
        req.flash("error", "Somthing Wrong!!!");
        return res.redirect("back");
    }
}