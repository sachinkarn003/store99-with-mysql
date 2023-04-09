const express = require("express");
const productController = require("../controller/product.controller");

const router = express.Router();
router.route('/').get(productController.getAll).post(productController.createOne);
router.route("/:id").get(productController.getOne).patch(productController.update).delete(productController.delete);
module.exports = router;