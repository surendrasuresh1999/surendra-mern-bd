require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const productRoute = require("./Routes/productsRoutes");
const userRoutes = require("./Routes/userRoutes");
const cartRoutes = require("./Routes/cartRoutes");
// express app
const app = express();

// middleware function
app.use(express.json());

app.use((req,res,next)=>{
    // console.log(req.path,req.method)
    next();
})
// routes
app.use('/products',productRoute)
app.use("/user",userRoutes)
app.use("/user/cart",cartRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('mongoose connected successfully')
    // listen for requests
    app.listen(process.env.PORT,()=>{
        console.log(`listening on port ${process.env.PORT}`);
    })
}).catch((error)=>{
    console.error(error)
})

