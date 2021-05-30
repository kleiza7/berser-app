
import CustomError from "../errors/customErrorHandler.js";

import contactEmail from "../helpers/sendEmail.js";

export const contact = async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message; 
    
    try {
      await contactEmail({
        from: name,
        to: process.env.TO_MAIL,
        subject: "Contact Form Message",
        html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
      });
      return res.status(200).json({
        success: true,
        message: "Token Sent To Your Email",
      });
    } catch (err) {
      console.log(err);
    }
  };