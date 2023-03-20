const {   verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin, } = require('./VeriFyToken');

const router = require('express').Router();
const User = require('../model/User');

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_KEY
      ).toString();
    }
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      // res.status(200).send(updatedUser);
      res.status(200).send({ payload: updatedUser, message: "user update success" ,responseCode:200});
    } catch (err) {
      res.status(400).send({ payload: {}, message: "some thing is wrong" ,responseCode:400});
    }
  });
  
  // //DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).send({ payload: updatedUser, message: "User has been deleted..." ,responseCode:200})
  } catch (err) {
    res.status(400).send({ payload: {}, message: "some thing is wrong" ,responseCode:400});
  }
});

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    console.log(others);
    res.status(200).send({ payload: others, message: "User exist  ..." ,responseCode:200})
  } catch (err) {
    res.status(400).send({ payload: {}, message: "some thing is wrong" ,responseCode:400});
  }
});

//GET ALL USER
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
      res.status(200).send({ payload: users, message: "all User list  ..." ,responseCode:200})
  } catch (err) {
    res.status(400).send({ payload: {}, message: "some thing is wrong" ,responseCode:400});
  }
});

//GET USER STATS

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  // date filter 
    // "start_date": "2023-01-23",
    // "end_date": "2023-01-23",
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
const filterdDate =new Date(req.body.start_date || req.body.end_date);
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: filterdDate } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).send({ payload: data, message: "user state  ..." ,responseCode:200})
  } catch (err) {
    res.status(400).send({ payload: {}, message: "some thing is wrong" ,responseCode:400});
  }
});
module.exports = router;