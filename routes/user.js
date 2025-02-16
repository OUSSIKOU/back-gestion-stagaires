const express = require("express");
const router = express.Router();
const controllersUsres = require("../controllers/user");
const auth = require("../middelware/auth");

router.post("/signup", controllersUsres.signup);
router.post("/login", controllersUsres.login);

// New routes
router.put("/profile", auth, controllersUsres.updateProfile);
router.get("/profile", auth, controllersUsres.getProfile);
module.exports = router;
