const DB = require('../DB/mysql');
const CategoryModel = DB.category;

// Delete
exports.deleteOne = Model =>
async (req, res, next) => {
    try{
        const {id} = req.params;
        const doc = await Model.destroy({where:{id}});
        if (!doc) {
            throw new Error('Not found', 404);
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    }catch(e){
        res.status(404).json({
            status:'fail',
            error:e.message
        })
    }
    
}
// Update
exports.updateOne = Model =>
async (req, res, next) => {
    try{
        const {id} = req.params;
        const found = await Model.findByPk(id);
        if(!found){
            throw new Error("id not found",404)
        }
        const doc = await Model.update(req.body,{where:{id}});
        res.status(200).json({
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
// Create
  exports.createOne = Model =>
  async (req, res, next) => {
    try{
        const doc = await Model.create(req.body);
        if(!doc){
            throw new Error("something is wrong",500);
        }
        res.status(201).json({
            status: 'success',
            data: {
                data: doc
            }
        });
    }catch(e){
        // let messages = {};
        // e.errors.forEach((error)=>{
        //     let message;
        //     message = error.message;
        //     messages[error.path]=message;
        // })
        res.status(404).json({
            status:'fail',
            error:e.message
        })
    }
  };
// Get One
  exports.getOne = Model =>
  async (req, res, next) => {
    try{
        const id = req.params.id;
        const doc = await Model.findByPk(id,{include:[CategoryModel]});
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

  exports.getAll = Model =>
  async (req, res, next) => {
    try{
        const doc = await Model.findAll();
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