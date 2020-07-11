const express = require("express");
const router = express.Router();
const { authenticate } = require("../../../../Middleware/auth");
const ticketController = require("./ticket.controller");

router.use(express.json());

router.post("/tickets", authenticate, ticketController.bookTicket);

module.exports = router;
