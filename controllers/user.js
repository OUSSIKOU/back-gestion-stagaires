const User = require("../models/user");
const hachage = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.signup = (req, res, next) => {
  const body = req.body;
  hachage
    .hash(body.password, 10)
    .then((hash) => {
      const user = new User({
        email: body.email,
        password: hash,
        username: body.username,
      });
      user
        .save()
        .then(() => res.status(201).json({ mesg: "user created with success" }))
        .catch((error) => res.status(500).json({ error: error }));
    })
    .catch((error) => res.status(400).json({ error: error }));
};

exports.login = (req, res, next) => {
  const body = req.body;
  User.findOne({ email: body.email })
    .then((user) => {
      if (!user) {
        res.status(401).json({ message: "unautorized" });
      }
      hachage
        .compare(body.password, user.password)
        .then((password) => {
          if (!password) {
            return res.status(401).json({ message: "unautorized" });
          } else {
            res.status(200).json({
              userId: user._id,
              // user: {
              //   email: user.email,
              //   username: user.username,
              //   imageUrl: user.imageUrl,
              // },
              token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
              }),
            });
          }
        })
        .catch((err) => res.status(500).json({ err }));
    })
    .catch((err) => res.status(500).json({ err }));
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { imageUrl } = req.body; // Extract the image URL or other profile data from the request body
    const userId = req.auth.userId; // Assuming you have middleware that adds user ID to req.user
    console.log("userId", userId);
    console.log("imageUrl", imageUrl);

    // Find user by ID and update
    const user = await User.findByIdAndUpdate(
      userId,
      { imageUrl },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile ..." });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.auth.userId; // Assuming you have middleware that adds user ID to req.user

    // Find user by ID
    const user = await User.findById(userId).select("imageUrl"); // Adjust fields as needed

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};
