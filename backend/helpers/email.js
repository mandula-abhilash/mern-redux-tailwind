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
      user: process.env.GMAIL_ID,
      pass: process.env.GMAIL_PASSWORD,
    },
    tls: {
      ciphers: "SSLv3",
    },
  });

  try {
    let info = await transporter.sendMail(emailData);
    console.log(`Message sent: ${info.response}`);
    return res.json({
      message: `Email has been sent to your email. Follow the instruction to activate your account`,
    });
  } catch (error) {
    res.status(404);
    console.log(`Problem sending email: ${error}`);
    throw new Error("Email sending error : " + error);
  }
};

export default sendEmailWithNodemailer;
