const { get } = require("http");
// const path = require("path");
const db = require("../models/");

module.exports = function (app) {

    app.get("/api/workouts", async (req, res) => {
      try {
        const data = await db.Workout.find({});
        res.json(data)
      } catch (error) {
        res.status(500).end();
      }
    });

    
    // app.get("/", (req, res) => {
    //     res.sendFile(path.join(__dirname + "/public/index.html"));
    // });
    // app.get("/exercise", (req, res) => {
    //     res.sendFile(path.join(__dirname + "/public/exercise.html"));
    // });
    // app.get("/stats", (req, res) => {
    //     res.sendFile(path.join(__dirname + "/public/stats.html"));
    // });
    
    // app.post("/submit", ({ body }, res) => {
    //     User.create(body)
    //       .then((dbUser) => {
    //         res.json(dbUser);
    //       })
    //       .catch((err) => {
    //         res.json(err);
    //       });
    //   });


}
