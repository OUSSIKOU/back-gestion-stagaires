const Validation = require("../models/emailValidationSystem");

exports.createValidation = (req, res) => {
  const body = req.body;
  const validation = new Validation({ ...body });
  validation
    .save()
    .then((validation) =>
      res
        .status(201)
        .json({
          message: "validation send with success",
          validation: validation,
        })
    )
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllValidations = (req, res) => {
  const validations = Validation.find()
    .then((validations) => res.status(200).json({ validations }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getById = async (req, res) => {
  try {
    const validation = await Validation.findOne({ _id: req.params.id });
    if (!validation) {
      return res.status(404).json({ message: "Validation not found" });
    }
    res.status(200).json({ validation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateValidation = (req, res) => {
  const body = req.body;
  const id = req.params.validationId;
  Validation.findOneAndUpdate({ _id: id }, { ...body })
    .then(res.status(200).json({ message: "Modified!" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteValidation = (req, res) => {
  const id = req.params.validationId;
  Validation.deleteOne({ _id: id })
    .then(res.status(200).json({ message: "Deleted!" }))
    .catch((error) => res.status(400).json({ error }));
};
