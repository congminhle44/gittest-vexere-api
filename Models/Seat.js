const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  code: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
});

const Seat = mongoose.model("Seat", seatSchema, "Seat");

module.exports = {
  seatSchema,
  Seat,
};
