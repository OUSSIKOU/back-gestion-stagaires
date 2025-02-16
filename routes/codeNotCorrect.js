const express = require("express");
const controllersCodeNotCorrect = require("../controllers/codeNotCorrect");
const auth = require("../middelware/auth");
const parse = express();
const router = express.Router();
parse.use(express.json());
router.post("", auth, controllersCodeNotCorrect.createCodeNotCorrect);
router.get("", auth, controllersCodeNotCorrect.getAllCodeNotCorrects);
router.get("/:id", auth, controllersCodeNotCorrect.getById);
router.put(
  "/:codeNotCorrectId",
  auth,
  controllersCodeNotCorrect.updateCodeNotCorrect
);
router.delete(
  "/:codeNotCorrectId",
  auth,
  controllersCodeNotCorrect.deleteCodeNotCorrect
);
module.exports = router;
