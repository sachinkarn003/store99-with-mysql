const DB = require('../DB/mysql');
const CartModel = DB.cart;
const UserModel = DB.user;
const ProductModel = DB.product;
const factoryController = require("./factory.controller");

module.exports.getAll = factoryController.getAll(CartModel);
module.exports.createOne = factoryController.createOne(CartModel);
module.exports.getOne = async (req, res, next) => {
    try{
        const id = req.params.id;
        const doc = await CartModel.findByPk(id,{include:[UserModel,ProductModel]});
        if(!doc){
            throw new Error("not found",404);
        }
        res.status(201).json({
            status: 'success',
            data: {
                data: doc
            }
        });
    }catch(e){
        res.status(404).json({
            status:'fail',
            error:e.message
        })
    }
  };
module.exports.update = factoryController.updateOne(CartModel);
module.exports.delete = factoryController.deleteOne(CartModel);