const axios = require("axios");
const Ai = require("../models/Ai");

exports.createAi = async (req, res) => {
  console.log("====================================");
  console.log(req.body);
  console.log("====================================");
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: "hello",
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPEN_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error communicating with AI service:", error);
  }
};

exports.getAllAis = (req, res) => {
  const ais = Ai.find()
    .then((ais) => res.status(200).json({ ais }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getById = async (req, res) => {
  try {
    const ai = await Ai.findOne({ _id: req.params.id });
    if (!ai) {
      return res.status(404).json({ message: "Ai not found" });
    }
    res.status(200).json({ ai });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAi = (req, res) => {
  const body = req.body;
  const id = req.params.aiId;
  Ai.findOneAndUpdate({ _id: id }, { ...body })
    .then(res.status(200).json({ message: "Modified!" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteAi = (req, res) => {
  const id = req.params.aiId;
  Ai.deleteOne({ _id: id })
    .then(res.status(200).json({ message: "Deleted!" }))
    .catch((error) => res.status(400).json({ error }));
};
