require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoute = require("./Routes/productsRoutes");
const blogRoute = require("./Routes/blogRoutes");
const userRoutes = require("./Routes/userRoutes");
const cartRoutes = require("./Routes/cartRoutes");
// express app
const app = express();
app.use(cors());

// middleware function
app.use(express.json());

app.use((req, res, next) => {
  // console.log(req.path,req.method)
  next();
});

// routes
app.use("/api/products", productRoute);
app.use("/api/blog", blogRoute);
app.use("/api/user", userRoutes);
app.use("/api/user/cart", cartRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongoose connected successfully");
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
