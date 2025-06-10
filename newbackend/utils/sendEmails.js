const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "", // your Gmail
    pass: "" // your App Password (no spaces)
  }
});

/**
 * Send email
 * @param {string} to - Recipient email
 * @param {string} subject - Subject of the email
 * @param {string} text - Plain text body
 */
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: '"Dast-e-Khair" <ahmadgcu321@gmail.com>',
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent to:", to);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
