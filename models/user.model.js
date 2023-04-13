const { Model } = require('sequelize');
const jwt = require("jsonwebtoken");
module.exports=(sequelize,DataTypes)=>{
    const User = sequelize.define('user',{
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              notNull: {
                msg: 'Email is required'
              },
              notEmpty: {
                msg: 'Email cannot be empty'
              },
              isEmail: {
                msg: 'Invalid email format'
              }
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: {
                args: [8, 255],
                msg: 'Password must be between 8 and 255 characters'
              }
            }
        },
        otp:{
          type:DataTypes.INTEGER
        },
        otpVerify:{
          type:DataTypes.BOOLEAN,
          defaultValue:false
        },
        passwordChangedAt:{
          type:DataTypes.DATE
        } 
    });
    // Instance method to generate JWT token for user
  User.prototype.generateAuthToken = function() {
    const token = jwt.sign({ id: this.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    return token;
  };
  // Virtual field for changedPasswordAfter
  User.prototype.changedPasswordAfter = function(JWTTimeStamps) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
      return JWTTimeStamps < changedTimestamp;
    }
    return false;
  };
    return User;
}
