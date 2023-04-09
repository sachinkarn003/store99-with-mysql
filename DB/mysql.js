const {Sequelize ,DataTypes} = require("sequelize");
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
// db.user = require('./users')(sequelize,DataTypes);
db.category = require('./../models/category.model')(sequelize,DataTypes);
db.product = require('./../models/product.model')(sequelize,DataTypes);


module.exports = db;