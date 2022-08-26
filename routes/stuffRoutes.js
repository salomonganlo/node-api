const express = require("express")
const router = express.Router()
const multer = require("../middleware/multer-config")

const auth = require("../middleware/auth")
const stuffCrtl = require("../controllers/stuffControllers")

router.get("/", auth, stuffCrtl.getAllStuff)
router.post("/", auth, multer, stuffCrtl.createStuff)
router.get("/:id", auth, stuffCrtl.getOneStuff)
router.put("/:id", auth, multer, stuffCrtl.updateStuff)
router.delete("/:id", auth, stuffCrtl.deleteOneStuff)

module.exports = router
