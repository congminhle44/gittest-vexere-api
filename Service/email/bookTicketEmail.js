const nodemailer = require("nodemailer");
const fs = require("fs"); //Dùng để dẫn file template
const hogan = require("hogan.js"); // compile file hjs sang html

const template = fs.readFileSync(
  "Service/email/bookingTicketEmailTemplate.hjs",
  "utf-8"
);

const compileTemplate = hogan.compile(template);

module.exports.sendTicketMail = (trip, ticket, user) => {
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
    to: "nhokdevil123@gmail.com",
    subject: "Mail xác nhận mua vé thành công",
    html: compileTemplate.render({
      email: user.email,
      fromStation: trip.fromStation.name,
      toStation: trip.toStation.name,
      price: trip.price,
      amount: ticket.seats.length,
      total: trip.price * ticket.seats.length,
      seatCodes: ticket.seats.map((seat) => seat.code).join(", "),
    }),
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) return console.log(err);
    console.log("Sent mail successful");
  });
};
