const Router = require("express").Router();
const { verifyTokenAndAdmin ,verifyTokenAndAuthorization } = require("../Auth/AuthMiddlewares");
const {
    addProduct,
    getAllProducts,
    getProduct,
    productByFilters,
    updateProduct,
    deleteProduct
} = require("./controller/index");



// add product 
Router.post("/addproduct",verifyTokenAndAdmin, addProduct);

// get product
Router.get("/find/:id", verifyTokenAndAdmin,getProduct);
//update product
Router.put("/update", verifyTokenAndAdmin,updateProduct);
// get all user
Router.get("/", verifyTokenAndAdmin,getAllProducts);
// get  product by dates filter
Router.get("/filter", verifyTokenAndAdmin,productByFilters);
Router.delete("/:id", verifyTokenAndAdmin,deleteProduct);



module.exports = Router;