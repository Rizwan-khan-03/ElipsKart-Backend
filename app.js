
const express = require('express');
require('./DB/config')
const app = express();
app.use(express.json())
const PORT = 6000;




// router 
const authRouter =require('./routes/Auth');
const userRouter = require('./routes/users');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');

// api

app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.use('/api/products',productRouter);
app.use('/api/cart',cartRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});