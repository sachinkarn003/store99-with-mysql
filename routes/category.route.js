const express = require("express");
const categoryController = require("../controller/category.controller");

const router = express.Router();
router.route('/').get(categoryController.getAll).post(categoryController.createOne);
router.route("/:id").get(categoryController.getOne).patch(categoryController.update).delete(categoryController.delete);
module.exports = router;