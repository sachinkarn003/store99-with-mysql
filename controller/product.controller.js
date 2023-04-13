const DB = require('../DB/mysql');
const ProductModel = DB.product;
const factoryController = require("./factory.controller");

module.exports.getAll = factoryController.getAll(ProductModel);
module.exports.createOne = factoryController.createOne(ProductModel);
module.exports.getOne = factoryController.getOne(ProductModel);
module.exports.update = factoryController.updateOne(ProductModel);
module.exports.delete = factoryController.deleteOne(ProductModel);

