const { Station } = require("../../../../Models/Station");

const getStation = (req, res, next) => {
  Station.find()
    .then((station) => res.status(200).json(station))
    .catch((err) => res.json(err));
};

const createStation = (req, res, next) => {
  const newStation = new Station(req.body);
  newStation
    .save()
    .then((station) => res.status(200).json(station))
    .catch((err) => res.json(err));
};

const updateStation = (req, res, next) => {
  const { id } = req.params;

  Station.findById(id)
    .then((stations) => {
      if (!stations)
        return Promise.reject({
          status: 404,
          message: "Station not found",
        });
      stations._doc = {
        ...stations._doc,
        ...req.body,
      };
      return stations.save();
    })
    .then((station) => res.status(200).json(station))
    .catch((err) => res.json(err));
};

const patchStation = (req, res, next) => {
  const { id } = req.params;
  const updateObject = req.body;
  Station.findByIdAndUpdate(id, updateObject, { new: true })
    .then((station) => res.status(200).json(station))
    .catch((err) => res.json(err));
};

const delStation = (req, res, next) => {
  const { id } = req.params;
  Station.findByIdAndDelete(id)
    .then((station) => res.status(200).json(station))
    .catch((err) => res.json(err));
};

module.exports = {
  getStation,
  createStation,
  updateStation,
  patchStation,
  delStation,
};
