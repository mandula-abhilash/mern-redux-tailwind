import nodeMailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendEmailWithNodemailer = async (req, res, emailData) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      ciphers: "SSLv3",
    },
  });

  try {
    let info = await transporter.sendMail(emailData);
    console.log(`Message sent: ${info.response}`);
    return res.json({
      message: `An email has been sent to ${emailData.to} with account activation link. Please follow the instructions provided in the email. \nYou will be redirected to home page now in 5 seconds.`,
    });
  } catch (error) {
    res.status(404);
    console.log(`Problem sending email: ${error}`);
    throw new Error("Email sending error : " + error);
  }
};

const sendResetPasswordEmail = async (req, res, emailData) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      ciphers: "SSLv3",
    },
  });

  try {
    let info = await transporter.sendMail(emailData);
    console.log(`Message sent: ${info.response}`);
    return res.json({
      message: `An email has been sent to ${emailData.to} with reset password link. Please follow the instructions provided in the email. \nYou will be redirected to home page now in 5 seconds.`,
    });
  } catch (error) {
    res.status(404);
    console.log(`Problem sending email: ${error}`);
    throw new Error("Email sending error : " + error);
  }
};

export { sendEmailWithNodemailer, sendResetPasswordEmail };
