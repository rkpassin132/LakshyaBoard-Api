import crypto from "crypto";
const nodemailer = require("nodemailer");
import { verifyMailTemplate } from "./emailTemplate";
import { OAuth2Client } from "google-auth-library";

export const random = () => crypto.randomBytes(128).toString("base64");
export const authentication = (salt: String, password: String) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(process.env.CRYPTO_SECRET_KET!)
    .digest("hex");
};

const oAuth2Client = new OAuth2Client(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationLink = `${process.env.CLIENT_BASE_URL}/mail-verify?token=${token}`;
  console.log(verificationLink);
  const accessToken = await oAuth2Client.getAccessToken();

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_USER,
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      accessToken: accessToken || "",
    },
  });

  // Email options
  const mailOptions = {
    from: process.env.GMAIL_FROM,
    to: email,
    subject: "Email Verification from 75way Technologies",
    html: verifyMailTemplate(verificationLink),
  };
  // Send the email
  return await transport.sendMail(mailOptions);
};
