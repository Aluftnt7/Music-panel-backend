const express = require("express");

const { getById, update, add, updateRoom } = require("./room.controller");
const router = express.Router();

router.get("/", getById);
router.post("/", add);
router.put("/add-song/:id", update);
router.put("/:id", updateRoom);

module.exports = router;
