const DB = require('../DB/mysql');
const CategoryModel = DB.category;
const factoryController = require("./factory.controller");

module.exports.getAll = factoryController.getAll(CategoryModel);
module.exports.createOne = factoryController.createOne(CategoryModel);
module.exports.getOne = factoryController.getOne(CategoryModel);
module.exports.update = factoryController.updateOne(CategoryModel);
module.exports.delete = factoryController.deleteOne(CategoryModel);