require("dotenv").config();
require("express-async-errors");
require("./db");

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const tagRoute = require("./routes/tag");
const articleRoute = require("./routes/article");
const imageRoute = require("./routes/image");
const userRoute = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.use("/api/user", userRoute);
app.use("/api/tag", tagRoute);
app.use("/api/article", articleRoute);
app.use("/api/image", imageRoute);

// handle try catch <-- express-async-errors
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
