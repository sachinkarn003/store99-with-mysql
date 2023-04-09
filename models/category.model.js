module.exports=(sequelize,DataTypes)=>{
    const Category = sequelize.define('category',{
        name:DataTypes.STRING,
        image:DataTypes.STRING
    });
    return Category;
}