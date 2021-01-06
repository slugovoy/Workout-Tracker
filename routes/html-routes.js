// Packages and variables
const path = require("path");
const workout = require("../models/models.js")
// Export html routes
module.exports = function (app) {

  // Route to display last workout
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"../public/index.html"));
  });

  // Route to create exercise/workout
  app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname,"../public/exercise.html"));
  });

  // Route to display stats
  app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname,"../public/stats.html"));
  });
};
