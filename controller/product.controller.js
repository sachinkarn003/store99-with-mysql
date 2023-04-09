const DB = require('../DB/mysql');
const ProductModel = DB.product;
module.exports.getAll = async (req,res)=>{
    try{
        const allProduct = await ProductModel.findAll();
        res.status(200).json({
            status:'success',
            data:allProduct
        })
    }catch(e){
        res.status(404).json({
            status:'fail',
            error:e.message
        })
    }
}
module.exports.createOne = async (req,res)=>{
    try{
        const newProduct = await ProductModel.create(req.body);
        res.status(200).json({
            status:'success',
            data:newProduct
        })
    }
    catch(e){
        // let messages = {};
        // e.errors.forEach((error)=>{
        //     let message;
        //     message = error.message;
        //     messages[error.path]=message;
        // })
        res.status(500).json({
            status:'fail',
            error:e.message
        })
    }
}
module.exports.getOne = async (req,res)=>{
    try{
        const id = req.params.id;
        const product = await ProductModel.findByPk(id);
        res.status(200).json({
            status:'success',
            data:product
        })
    }catch(e){
        res.status(404).json({
            status:'fail',
            error:e.message
        })
    }
}
module.exports.update = async (req,res)=>{
    try{
        const {id} = req.params;
        const found = await ProductModel.findByPk(id);
        if(!found){
            throw new Error("id not found",404)
        }
        const productUpdate = await ProductModel.update(req.body,{where:{id}});
        res.status(200).json({
            status:'success',
            data:"updated successfully"
        })
    }catch(e){
        res.status(404).json({
            status:'fail',
            error:e.message
        })
    }
}

module.exports.delete = async (req,res)=>{
    try{
        const {id} = req.params;
        const found = await ProductModel.destroy({where:{id}});
        if(!found){
            throw new Error("id not found",404)
        }
        res.status(200).json({
            status:'success',
            data:"deleted successfully"
        })
    }catch(e){
        res.status(404).json({
            status:'fail',
            error:e.message
        })
    }
}
