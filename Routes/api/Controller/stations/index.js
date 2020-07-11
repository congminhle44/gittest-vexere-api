const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../../../../Middleware/auth");
const stationController = require("./station.controller");

router.use(express.json());
router.get("/stations", stationController.getStation);

router.post(
  "/stations",
  authenticate,
  authorize(["admin"]),
  stationController.createStation
);

router.put("/stations/:id", stationController.updateStation);

router.patch("/stations/:id", stationController.patchStation);

router.delete("/stations/:id", stationController.delStation);

module.exports = router;
