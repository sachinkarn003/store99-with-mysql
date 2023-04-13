const express = require("express");
const cartController = require("../controller/cart.controller");
const Auth = require("../middleware/user.middleware")
const app = express();
const router = express.Router();
app.use(Auth.protect);
router.route('/').get(cartController.getAll).post(cartController.createOne);
router.route("/:id").get(cartController.getOne).patch(cartController.update).delete(cartController.delete);
module.exports = router;