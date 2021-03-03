const express = require("express");

const {
  getById,
  query,
  remove,
  update,
  add,
  checkIsValidUser,
  updateRoom,
} = require("./room.controller");
const router = express.Router();

// middleware that is specific to this router
// router.use(requireAuth)

// router.get('/', query)
// router.get('/', requireBeingMember, getById)
router.get("/", getById);
router.put("/:id", updateRoom);
router.put("/addSong", update);
// router.put("/", update);
router.post("/:id/validate", checkIsValidUser);
router.post("/", add);
router.delete("/:id", remove);

module.exports = router;

// router.get('/', query)
// router.get('/:id', getById)
// router.put('/:id',  requireAuth, update)
// router.post('/', add)
// router.delete('/:id',  requireAuth, requireAdmin, remove)
