const Audit = require("../models/audit");

exports.createAudit = (req, res) => {
  const body = req.body;
  const audit = new Audit({ ...body });
  audit
    .save()
    .then((audit) =>
      res.status(201).json({
        message: "Audit created with success",
        audit: audit,
      })
    )
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllAudits = (req, res) => {
  const audits = Audit.find()
    .then((audits) => res.status(200).json({ audits }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getById = async (req, res) => {
  try {
    const audit = await Audit.findOne({ _id: req.params.id });
    if (!audit) {
      return res.status(404).json({ message: "Audit not found" });
    }
    res.status(200).json({ audit });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAudit = (req, res) => {
  const body = req.body;
  const id = req.params.auditId;
  Audit.findOneAndUpdate({ _id: id }, { ...body })
    .then(res.status(200).json({ message: "Modified!" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteAudit = (req, res) => {
  const id = req.params.auditId;
  Audit.deleteOne({ _id: id })
    .then(res.status(200).json({ message: "Deleted!" }))
    .catch((error) => res.status(400).json({ error }));
};
