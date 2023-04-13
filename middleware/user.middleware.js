const {promisify} = require('util')
const DB = require("../DB/mysql");
const jwt = require("jsonwebtoken");
const UserModel = DB.user;

exports.protect = async(req, res, next) => {
    try{
    // 1) Getting token and check of it's there
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        throw new Error('You are not logged in! Please log in to get access.', 401);
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded);
    // 3) Check if user still exists
    const currentUser = await UserModel.findByPk(decoded.id);
    if (!currentUser) {
        throw new Error('The user belonging to this token does no longer exist.',401);
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
       throw new Error('User recently changed password! Please log in again.', 401);
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
}catch(e){
    res.status(400).json({
        status: 'fail',
        error: e.message
    })
}
};