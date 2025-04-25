const Category = require("../models/category.model");
const Product = require("../models/product.model");

exports.userPage = async (req, res) => {
    const { category, search } = req.query;
    let filter = {};

    if (category) {
        filter['category'] = category;
    }

    if (search) {
        // Case-insensitive regex search on title or description
        filter.$or = [
            { title: { $regex: search, $options: 'i' } },
            { desc: { $regex: search, $options: 'i' } }
        ];
    }
  try {
    let categories = await Category.find();
    let allProducts = await Product.find(filter)
    .populate("category")
    .populate("subcategory")
    .populate("extracategory");
    return res.render("index", {categories, allProducts})
  } catch (error) {
    console.log(error);
    req.flash("error", "Somthing Wrong!!!");
    return res.redirect("back");
  }
};


exports.signleProduct = async (req, res) =>{
    try {
        let product = await Product.findById(req.params.id)
        .populate("category")
        .populate("subcategory")
        .populate("extracategory");
    
          return res.render("get_product", {product});
      } catch (error) {
        console.log(error);
        req.flash("error", "Somthing Wrong!!!");
        return res.redirect("back");
      }
}


// exports.addToFavorite = async (req, res) => {
//   let userId = req.user._id;
//   let productId = req.params.id;

//   await Favorite.create({
//     user: userId,
//     productId: productId
//   })
// }
// exports.getAllFavorites = async (req, res) => {
//   let userId = req.user._id;

//   let allFavorites = await Favorite.find({
//     user: userId,
//   }).populate("user").populate("productId")
//   render
// }