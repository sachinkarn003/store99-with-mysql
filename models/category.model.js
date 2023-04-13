module.exports=(sequelize,DataTypes)=>{
    const Category = sequelize.define('category',{
        name:{
            type:DataTypes.STRING,
            allowNull: false,
            unique:true,
            validate: {
                notEmpty: true, // Make sure the email field is not empty
            }
        },
        image:DataTypes.STRING,
        productId:{
            type:DataTypes.INTEGER
        }
    });
    return Category;
}