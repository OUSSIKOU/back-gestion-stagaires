const express = require("express");
const app = express();
const chalk = require("chalk");
const path = require("path");
const cors = require("cors");
const debug = require("debug")("server.js");
require("./db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");
const codeCorrectRoutes = require("./routes/codeCorrect");
const codeNotCorrectRoutes = require("./routes/codeNotCorrect");
const emailValidationSystemRoutes = require("./routes/emailValidationSystem");
const aiRoutes = require("./routes/ai");
const auditRoutes = require("./routes/audit");
const imageRoutes = require("./routes/image");
const codeNotCorrect = require("./models/codeNotCorrect");
debug.log = console.log.bind(console); // This line enables printing to the console
dotenv.config();

//CORS« Cross Origin Resource Sharing ».
//
app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//   );
//   next();
// });

//json format

app.use(express.json());

// stores the images uploaded by multer in images folder

app.use("/images", express.static(path.join(__dirname, "images")));

//routes

app.use("/api/auth", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/audit", chatRoutes);
app.use("/api/codeCorrect", codeCorrectRoutes);
app.use("/api/codeNotCorrect", codeNotCorrectRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/validationEmail", emailValidationSystemRoutes);
app.use("/api/stuff", imageRoutes);

// listen on port

const port = process.env.PORT || 7000;
app.listen(port, () => {
  debug("--");
  debug(chalk.green(`PORT APP:\t\t\t${port}`));
  debug(chalk.red(`Database:\t\t\t${process.env.MONGODB_URI}`));
  debug("--");
});
