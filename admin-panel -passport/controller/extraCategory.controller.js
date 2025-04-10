const Category = require("../models/category.model");
const SubCategory = require("../models/subCategory.model");

exports.extraCategoryPage = async (req, res) => {
  try {
    let categories = await Category.find();
    let subCategories = await SubCategory.find();
    return res.render("extracategory/add_extracategory", {categories, subCategories})
  } catch (error) {
    console.log(error);
    req.flash("error", "Somthing Wrong!!!");
    return res.redirect("back");
  }
};
