const mongoose = require("mongoose");
const { seatSchema } = require("./Seat");
const ticketSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  seats: [seatSchema],
  totalPrice: Number,
});

const Ticket = mongoose.model("Ticket", ticketSchema, "Ticket");

module.exports = {
  ticketSchema,
  Ticket,
};
