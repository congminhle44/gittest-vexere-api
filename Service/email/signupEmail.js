const nodemailer = require("nodemailer");

module.exports.signupMailer = (user) => {
  const transport = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    requireSSL: true,
    auth: {
      user: "lucas.lee752000@gmail.com",
      pass: "Minh123456",
    },
  };

  const transporter = nodemailer.createTransport(transport);

  const mailOptions = {
    from: "lucas.lee752000@gmail.com",
    to: user.email,
    subject: "Create new account successfully",
    html: `Dear ${user.fullName}
      Welcome our new member, we bring the best booking trip ticket in the world`,
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) return console.log(err);
    console.log("Sent mail successfully");
  });
};
