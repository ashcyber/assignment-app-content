const env = process.env.NODE_ENV || "development";
let port = process.env.PORT || 5000;

const express = require("express");

if (env !== "testing") {
  const db = require("./config/db");
}

const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("./middleware/logger");
const passport = require("passport");

const app = express();

app.use(passport.initialize());

require("./config/passport");

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(logger);

/**
 * ROUTES
 */

app.get("/", (req, res) => {
  res.json({ status: "success", message: "Server is live" });
});

const tollRoutes = require("./routes/toll");
const userRoutes = require("./routes/user");

app.use("/api/toll", tollRoutes);
app.use("/api/user", userRoutes);

app.listen(port, function () {
  console.log(`Server listening to port ${port}`);
});

module.exports = app;
