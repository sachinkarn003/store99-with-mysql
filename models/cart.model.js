module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('cart', {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      userId:{
        type:DataTypes.INTEGER
      },
      productId:{
        type:DataTypes.INTEGER
    }
      // ... Other fields ...
    });
  
    return Cart;
  };