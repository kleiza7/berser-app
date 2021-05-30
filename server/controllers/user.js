import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import CustomError from "../errors/customErrorHandler.js";

import asyncErrorWrapper from "express-async-handler";

import sendEmail from "../helpers/sendEmail.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    const isPasswordCorrect = bcrypt.compareSync(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    res.cookie('token', token, { maxAge: 900000, httpOnly: true });
        

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = asyncErrorWrapper(async (req, res) => {
  const {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    dateOfBirth,
    about,
    place,
    website,
    profileImage,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists." });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      dateOfBirth: `${dateOfBirth}`,
      about: `${about}`,
      place: `${place}`,
      website: `${website}`,
      profileImage: `${profileImage}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.cookie('token', token, { maxAge: 900000, httpOnly: true });
    
    res.status(200).json({ result, token });
  } catch (error) {
    console.log("Boş alanlar");
    res.status(500).json({ message: "Something went wrong." });
  }
});
export const logout = async(req,res) => {
  
  res.clearCookie('token')
  res.status(200).json({message:"Successfully Logged Out"})
  
}

export const getSingleUser = asyncErrorWrapper(async(req,res,next) => {

  const {id} = req.params;

  const user = await User.findById(id);

  return res.status(200)
  .json({
      success:true,
      data:user
  });

});
export const getAllUsers = asyncErrorWrapper(async(req,res,next) => {
  const users = await User.find();

  return res.status(200)
  .json({
      success : true,
      data : users
  })
});


export const forgotPassword = asyncErrorWrapper(async (req, res, next) => {
  const resetEmail = req.body.email;

  const user = await User.findOne({ email: resetEmail });
  if (!user) {
    return { message: "There is no user with  that email" }, 400;
  }
  const resetPasswordToken = user.getResetPasswordTokenFromUser();

  await user.save();

  const resetPasswordUrl = `http://localhost:3000/resetPassword/${resetPasswordToken}`;

  const emailTemplate = `
        <h3>Reset Your Password</h3>
       
        <p> 
       <font size="5" color="red" face="Georgia, Arial, Garamond">  
       Click on the link to change your password.</font> </p>
       <p>
       <font size="6" color="red"  face="Georgia, Arial, Garamond"> 
       This <a href = '${resetPasswordUrl}' target = '_blank'> link </a> will expire in 1 hour
        </font>
         </p>
    `;

  try {
    await sendEmail({
      from: process.env.SMTP_USER,
      to: resetEmail,
      subject: "Reset Your Password",
      html: emailTemplate,
    });
    return res.status(200).json({
      success: true,
      message: "Token Sent To Your Email",
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return next(new CustomError("Email Gönderilemedi", 500));
  }
});

export const resetPassword = async (req, res, next) => {
  const { resetPasswordToken } = req.query;

  const { password } = req.body;

  if (!resetPasswordToken) {
    return res.status(400).json({ message: "Token yok." });
  }
  let user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(400).json({ message: "Süresi gecmis token." });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Reset Password Process Successfull",
  });
};

