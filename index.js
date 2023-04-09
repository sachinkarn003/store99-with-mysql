const express = require("express");
const cors = require("cors");
//ENV
require("dotenv").config();
//DB Connection
require("./DB/mysql");
//Routers Path
const Product = require("./routes/product.route");

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// Routers
app.use('/api/v1/products',Product);

app.listen(port,()=>{
    console.log("Server is running on "+port);
})