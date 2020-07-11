const { Trip } = require("../../../../Models/Trip");
const { Seat } = require("../../../../Models/Seat");
const { Ticket } = require("../../../../Models/Ticket");
const { sendTicketMail } = require("../../../../Service/email/bookTicketEmail");

const _ = require("lodash");

const bookTicket = (req, res, next) => {
  const { tripId, seatCodes } = req.body;
  const { _id: userId } = req.user;

  Trip.findById(tripId)
    .populate("fromStation")
    .populate("toStation")
    .then((trip) => {
      if (!trip)
        return Promise.reject({
          status: 404,
          message: "Trip doesn't exist",
        });
      const availableSeatCodes = trip.seats
        .filter((seat) => !seat.isBooked)
        .map((seat) => seat.code);

      const errSeatCodes = [];
      seatCodes.map((code) => {
        if (availableSeatCodes.indexOf(code) === -1) errSeatCodes.push(code);
      });
      if (!_.isEmpty(errSeatCodes))
        return Promise.reject({
          status: 400,
          message: `${errSeatCodes.join(", ")} is/are not available`,
        });
      const newTicket = new Ticket({
        userId,
        tripId,
        seats: seatCodes.map((code) => new Seat({ code })),
        totalPrice: seatCodes.length * trip.price,
      });

      seatCodes.map((code) => {
        const seatIndex = trip.seats.findIndex((seat) => seat.code === code);
        trip.seats[seatIndex].isBooked = true;
      });
      return Promise.all([trip.save(), newTicket.save()]);
    })
    .then(([trip, ticket]) => {
      sendTicketMail(trip, ticket, req.user);
      res.status(200).json(ticket);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = {
  bookTicket,
};
