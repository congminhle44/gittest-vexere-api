const express = require("express");
const router = express.Router();
const tripController = require("./trip.controller");

router.use(express.json());

router.post("/trips", tripController.createTrip);
router.get("/trips", tripController.getTrip);
router.get("/trips/:id", tripController.getTripById);
router.delete("/trips/:id", tripController.deleteTripById);
router.patch("/trips/:id", tripController.patchTrip);

module.exports = router;
