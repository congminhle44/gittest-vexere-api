const mongoose = require("mongoose");
const { seatSchema } = require("./Seat");
const tripSchema = new mongoose.Schema({
  fromStation: { type: mongoose.Schema.Types.ObjectId, ref: "Station" },
  toStation: { type: mongoose.Schema.Types.ObjectId, ref: "Station" },
  price: { type: Number, required: true },
  seats: [seatSchema],
  startTime: { type: Date, default: new Date() },
});

const Trip = mongoose.model("Trip", tripSchema, "Trip");

module.exports = {
  tripSchema,
  Trip,
};
