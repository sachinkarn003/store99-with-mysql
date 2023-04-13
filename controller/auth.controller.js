//Third Paryt Library
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const DB = require('../DB/mysql');
const UserModel = DB.user;
const helper = require("./../helpers/helper");
//signup function
exports.signup = async (req, res,) => {
    try {
        const { email, password, confirmPassword } = req.body;
        // 1) Check if password and confirmPassword match
        if (password !== confirmPassword) {
            throw new Error("Password and ConfirmPassword do not match", 400);
        }

        // 2) Check if email is provided
        if (!email) {
            return next(new AppError("Please provide an email", 400));
        }
        // Generate a salt
        const salt = bcrypt.genSaltSync(10);
        // Hash the password with the salt
        const hashedPassword = bcrypt.hashSync(password, salt);
        // Generate OTP
        const otp = helper.generateOtp();
        // Create a new User record
        const newUser = await UserModel.create({
            email: email,
            password: hashedPassword,
            otp: otp
        });

        // Return success response with generated OTP
        res.status(201).json({
            status: "Success",
            otp: otp
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: 'fail',
            error: e.message
        })
    }
};
//login function
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1) Check if email and password exist
        if (!email || !password) {
            throw new Error('Please provide email and password!', 400);
        }
        // 2) Check if user exists && password is correct
        const user = await UserModel.findOne({ where: { email: email } });

        // 3) Check Is OTP verify or not
        if (!user.otpVerify) {
            throw new Error('OTP is not verified', 410);
        }
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!user || !isMatch) {
            throw new Error('Incorrect email or password', 401);
        }

        // 3) If everything ok, send token to client
        const token = user.generateAuthToken();
        res.status(201).json({
            status: "Success",
            token,
            user
        });
    } catch (e) {
        res.status(400).json({
            status: 'fail',
            error: e.message
        })
    }
};
//varification
exports.verifyOtp = async (req, res, next) => {
    try {
        const { email, otp } = _.pick(req.body, ["email", "otp"]);

        if (!email || !otp) {
            return next(new AppError("Please enter email and OTP", 400));
        }

        // Find a User record by email and OTP
        const user = await UserModel.findOne({
            where: { email: email, otp: otp }
        });

        // If User is not found, return an error response
        if (!user) {
            throw new Error("Store user not found", 400);
        }

        // Check if OTP has expired
        const differenceInVerifiedAt = moment().diff(user.updateAt, "minutes");
        if (differenceInVerifiedAt > 15) {
            return next(new AppError("OTP has expired", 410));
        }

        // Generate token and update user record
        const token = user.generateAuthToken();
        // store.token = token;
        user.otpVerify = true;
        await user.save();

        // Return success response with updated user object
        res.status(201).json({
            status: "Success",
            user,
            token
        });
    } catch (e) {
        res.status(404).json({
            status: 'fail',
            error: e.message
        })
    }
};

exports.resendOtp = async(req, res, next) => {
    try{
        let { email } = _.pick(req.body, ['email']);
        const user = await UserModel.findOne({where: {email:email} });
        const otp = helper.generateOtp();
        user.otpVerify = false;
        user.otp = otp;
        await user.save();
        res.status(200).json({
            status: 'success',
            otp
        })
    }catch(e){
        res.status(400).json({
            status: 'fail',
            error: e.message
        })
    }
   
}
