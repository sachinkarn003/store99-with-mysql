const jwt = require("jsonwebtoken");

exports.generateOtp = ()=>{
    let min = 100000;
    let  max = 900000;
    return Math.floor(min + Math.random() * max);
}

exports.signToken = (id)=>{
    console.log(id,'id');
    let val = jwt.sign({id},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_IN});
    console.log(val,'values')
    return val;
}
