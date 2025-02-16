const CodeNotCorrect = require("../models/codeNotCorrect");

exports.createCodeNotCorrect = (req, res) => {
  const body = req.body;
  const codeNotCorrect = new CodeNotCorrect({ ...body });
  codeNotCorrect
    .save()
    .then((codeNotCorrect) =>
      res.status(201).json({
        message: "CodeNotCorrect send with success",
        codeNotCorrect: codeNotCorrect,
      })
    )
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllCodeNotCorrects = (req, res) => {
  const codeNotCorrects = CodeNotCorrect.find()
    .then((codeNotCorrects) => res.status(200).json({ codeNotCorrects }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getById = async (req, res) => {
  try {
    const codeNotCorrect = await CodeNotCorrect.findOne({ _id: req.params.id });
    if (!codeNotCorrect) {
      return res.status(404).json({ message: "CodeNotCorrect not found" });
    }
    res.status(200).json({ codeNotCorrect });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCodeNotCorrect = (req, res) => {
  const body = req.body;
  const id = req.params.codeNotCorrectId;
  CodeNotCorrect.findOneAndUpdate({ _id: id }, { ...body })
    .then(res.status(200).json({ message: "Modified!" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteCodeNotCorrect = (req, res) => {
  const id = req.params.codeNotCorrectId;
  CodeNotCorrect.deleteOne({ _id: id })
    .then(res.status(200).json({ message: "Deleted!" }))
    .catch((error) => res.status(400).json({ error }));
};
