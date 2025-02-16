const CodeCorrect = require("../models/codeCorrect");

exports.createCodeCorrect = (req, res) => {
  const body = req.body;
  const codeCorrect = new CodeCorrect({ ...body });
  codeCorrect
    .save()
    .then((codeCorrect) =>
      res
        .status(201)
        .json({
          message: "CodeCorrect send with success",
          codeCorrect: codeCorrect,
        })
    )
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllCodeCorrects = (req, res) => {
  const codeCorrects = CodeCorrect.find()
    .then((codeCorrects) => res.status(200).json({ codeCorrects }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getById = async (req, res) => {
  try {
    const codeCorrect = await CodeCorrect.findOne({ _id: req.params.id });
    if (!codeCorrect) {
      return res.status(404).json({ message: "CodeCorrect not found" });
    }
    res.status(200).json({ codeCorrect });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCodeCorrect = (req, res) => {
  const body = req.body;
  const id = req.params.codeCorrectId;
  CodeCorrect.findOneAndUpdate({ _id: id }, { ...body })
    .then(res.status(200).json({ message: "Modified!" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteCodeCorrect = (req, res) => {
  const id = req.params.codeCorrectId;
  CodeCorrect.deleteOne({ _id: id })
    .then(res.status(200).json({ message: "Deleted!" }))
    .catch((error) => res.status(400).json({ error }));
};
