module.exports=(sequelize,DataTypes)=>{
    const products = sequelize.define('products',{
        name:{
            type:DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true, // Make sure the email field is not empty
              }
        },
        price:{
            type:DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true, // Make sure the email field is not empty
              }
        },
        qty:{
            type:DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true, // Make sure the email field is not empty
              }
        },
        image:{
            type:DataTypes.STRING,
            defaultValue:null
        }
    });
    return products;
}

//ENUM Example
// const User = sequelize.define('User', {
//     role: {
//       type: Sequelize.ENUM('admin', 'user', 'guest'),
//       allowNull: false
//     }
//   })