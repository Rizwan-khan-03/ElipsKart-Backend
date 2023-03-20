const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin, } = require('./VeriFyToken');
const Cart = require('../model/Cart');
const router = require('express').Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).send({ payload: savedCart, message: "Cart has been added...", responseCode: 200 })
    } catch (err) {
        res.status(400).send({ payload: {}, message: "some thing is wrong", responseCode: 400, err: err });
    }
});

// //UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.body.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).send({ payload: updatedCart, message: "Cart has been updated...", responseCode: 200 })
    } catch (err) {
        res.status(400).send({ payload: {}, message: "some thing is wrong", responseCode: 400, err: err });
    }
});


//GET USER CART userId
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });
      res.status(200).send({ payload: cart, message: "Cart data...", responseCode: 200 })
    } catch (err) {
        res.status(400).send({ payload: {}, message: "some thing is wrong", responseCode: 400, err: err });
    }
  });

// // delete
// router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
//     try {
//         const deletedCart = await Cart.findByIdAndDelete(req.params.id,);
//         res.status(200).send({ payload: deletedCart, message: "Cart has been deleted...", responseCode: 200 })
//     } catch (err) {
//         res.status(400).send({ payload: {}, message: "some thing is wrong", responseCode: 400, err: err });
//     }
// });

// //get cart by user id
// router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
//     try {
//       const product = await Product.findById(req.params.id);
//       const {...others } = product._doc;
//       console.log(others);
//       res.status(200).send({ payload: others, message: "product exist  ..." ,responseCode:200})
//     } catch (err) {
//       res.status(400).send({ payload: {}, message: "some thing is wrong" ,responseCode:400});
//     }
//   });

// //get all product

// // router.get("/", verifyTokenAndAdmin, async (req, res) => {
// //     const query = req.query.limit;
// //     try {
// //       const products = query
// //         ? await Product.find().sort({ _id: -1 }).limit(5)
// //         : await Product.find();
// //         res.status(200).send({ payload: products, message: "all products list  ..." ,responseCode:200})
// //     } catch (err) {
// //       res.status(400).send({ payload: {}, message: "some thing is wrong" ,responseCode:400});
// //     }
// // //   });
// // In the modified code, we use the parseInt function to convert the limit and offset values from strings to integers.
// // We also set default values of 10 for limit and 0 for offset in case the user does not provide these values.

// // Then, we use the skip and limit methods of the Product model to skip the first offset number of products and 
// //retrieve limit number of products, respectively. We also update the response message to indicate which range of products has been retrieved.

// // With these changes, users can specify the number of products to retrieve and 
// //the starting point of the retrieval using the limit and offset query parameters.

// router.get("/", verifyTokenAndAdmin, async (req, res) => {
//     const limit = parseInt(req.body.limit) || 10; // default limit is 10
//     const offset = parseInt(req.body.offset) || 1; // default offset is 1
//     try {
//       const products = await Product.find()
//         .sort({ _id: -1 })
//         .skip(offset)
//         .limit(limit);
//       res.status(200).send({
//         payload: products,
//         message: `Products from ${offset} to ${offset + limit - 1} retrieved successfully.`,
//         responseCode: 200,
//       });
//     } catch (err) {
//       res.status(400).send({
//         payload: {},
//         message: "Something went wrong.",
//         responseCode: 400,
//       });
//     }
//   });
//   // also get by this 
//   //GET ALL PRODUCTS
// // router.get("/", async (req, res) => {
// //     const qNew = req.query.new;
// //     const qCategory = req.query.category;
// //     try {
// //       let products;
  
// //       if (qNew) {
// //         products = await Product.find().sort({ createdAt: -1 }).limit(1);
// //       } else if (qCategory) {
// //         products = await Product.find({
// //           categories: {
// //             $in: [qCategory],
// //           },
// //         });
// //       } else {
// //         products = await Product.find();
// //       }
  
// //       res.status(200).json(products);
// //     } catch (err) {
// //       res.status(500).json(err);
// //     }
// //   });
  






module.exports = router;