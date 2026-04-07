const express = require("express");
const app = express();

app.use(express.json());

const path = require("path");
app.use(express.static(path.join(__dirname, "../public")));

const productRoutes = require("./routes/products");
app.use("/", productRoutes);

module.exports = app;