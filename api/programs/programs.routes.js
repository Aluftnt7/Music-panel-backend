const express = require("express");

const { query, remove, add } = require("./programs.controller");
const router = express.Router();

router.get("/", query);
router.post("/", add);
router.delete("/:id", remove);

module.exports = router;
