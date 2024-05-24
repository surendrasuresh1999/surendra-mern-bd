require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const blogRoute = require("./Routes/blogRoutes");
const quoteRoute = require("./Routes/quoteRoutes");
const commentRoute = require("./Routes/commentRoutes");
const userRoutes = require("./Routes/userRoutes");
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
app.use("/api/blog", blogRoute);
app.use("/api/quote", quoteRoute);
app.use("/api/comments", commentRoute);
app.use("/api/user", userRoutes);

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
