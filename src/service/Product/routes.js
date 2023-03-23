const Router = require("express").Router();
const { verifyTokenAndAdmin ,verifyTokenAndAuthorization } = require("../Auth/AuthMiddlewares");
const {
    addProduct,
    getAllProducts,
    getProduct,
    productByFilters,
    updateProduct
} = require("./controller/index");



// add product 
Router.post("/addproduct",verifyTokenAndAdmin, addProduct);

// get product
Router.get("/find/:id", verifyTokenAndAdmin,getProduct);
//update product
Router.put("/update", verifyTokenAndAuthorization,updateProduct);
// get all user
Router.get("/", verifyTokenAndAdmin,getAllProducts);
// get  product by dates filter
Router.get("/filter", verifyTokenAndAdmin,productByFilters);



module.exports = Router;