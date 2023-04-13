const {Sequelize ,DataTypes} = require("sequelize");
// const Category = require('../models/category.model'); 
// const Product = require("../models/product.model");
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const sequelize = new Sequelize(DB_NAME,DB_USER,DB_PASSWORD,{
    host:DB_HOST,
    dialect:'mysql',
    logging:false,
    pool:{max:5,min:0,idle:10000}
});
sequelize.authenticate()
.then(()=>{
    console.log("connected");
}).catch(err => console.log(err));

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.sequelize.sync({force:true,match:/all-india$/})
db.sequelize.sync({force:false})
.then(()=>{
    console.log("yes you are sync");
})
/********************** Models *****************************/ 
db.category = require('./../models/category.model')(sequelize,DataTypes);
db.product = require('./../models/product.model')(sequelize,DataTypes); 
db.user = require("./../models/user.model")(sequelize,DataTypes);
db.cart = require("./../models/cart.model")(sequelize,DataTypes);
/********************** Relationship *****************************/ 
db.category.hasMany(db.product, { foreignKey: 'productId' }); // A Category has many Product
db.product.belongsTo(db.category, { foreignKey: 'categoryId' }); // A Product belongs to a Category

db.cart.belongsTo(db.product, { foreignKey: 'productId', onDelete: 'CASCADE' });
db.cart.belongsTo(db.user, { foreignKey: 'userId', onDelete: 'CASCADE' });

module.exports = db;