const express = require('express');
const controllersValidation = require('../controllers/emailValidationSystem');
const auth = require('../middelware/auth');
const parse = express();
const router = express.Router();
parse.use(express.json());
router.post('',auth,controllersValidation.createValidation);
router.get('', auth ,controllersValidation.getAllValidations);
router.get('/:id', auth , controllersValidation.getById );
router.put('/:validationId', auth , controllersValidation.updateValidation);
router.delete('/:validationId', auth , controllersValidation.deleteValidation);
module.exports = router;