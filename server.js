// Packages
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// PORT
const PORT = process.env.PORT || 3000;
// Variable for express
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Static for everything in public folder
app.use(express.static("public"));
// Connection for Heroku and Atlas
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
// Routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
