const { Trip } = require("../../../../Models/Trip");
const { Seat } = require("../../../../Models/Seat");
const _ = require("lodash");
const codeArray = [
  "A01",
  "A02",
  "A03",
  "A04",
  "A05",
  "A06",
  "A07",
  "A08",
  "A09",
  "A10",
  "A11",
  "A12",
  "B01",
  "B02",
  "B03",
  "B04",
  "B05",
  "B06",
  "B07",
  "B08",
  "B09",
  "B10",
  "B11",
  "B12",
];
const createTrip = (req, res, next) => {
  const { fromStation, toStation, price, startTime } = req.body;
  const seats = codeArray.map((code) => {
    return new Seat({ code });
  });

  const newTrip = new Trip({ fromStation, toStation, price, seats, startTime });
  newTrip
    .save()
    .then((trip) => res.status(200).json(trip))
    .catch((err) => res.json(err));
};
const getTrip = (req, res, next) => {
  Trip.find()
    .then((trip) => {
      const _trips = trip.map((trip) => {
        return _.chain(trip)
          .get("_doc")
          .omit(["seats"])
          .assign({
            availableSeatNumber: trip.seats.filter((seat) => !seat.isBooked)
              .length,
          })
          .value();
      });
      res.status(200).json(_trips);
    })
    .catch((err) => res.json(err));
};

const getTripById = (req, res, next) => {
  const { id } = req.params;
  Trip.findById(id)
    .then((trip) => res.status(200).json(trip))
    .catch((err) => res.json(err));
};

const deleteTripById = (req, res, next) => {
  const { id } = req.params;
  Trip.findByIdAndDelete(id)
    .then((trip) => res.status(200).json(trip))
    .catch((err) => res.json(err));
};
const patchTrip = (req, res, next) => {
  const { id } = req.params;
  const patchObject = req.body;
  Trip.findByIdAndUpdate(id, patchObject, { new: true })
    .then((trip) => res.status(200).json(trip))
    .catch((err) => res.json(err));
};

module.exports = {
  createTrip,
  getTrip,
  getTripById,
  deleteTripById,
  patchTrip,
};
