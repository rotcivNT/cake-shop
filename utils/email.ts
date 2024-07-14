import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ngocthang.devweb@gmail.com",
    pass: "tqxmsypfhhljwgaf",
  },
});

const sendEmail = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: "ngocthang.devweb@gmail.com",
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
