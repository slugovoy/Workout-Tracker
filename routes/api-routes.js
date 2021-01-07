// Variable for database
const db = require("../models/");

module.exports = function (app) {

  // Get all documents and send it to front end for extracting last one.

  // Use async/await 
  app.get("/api/workouts", async (req, res) => {
    try {
      // Use aggregate to dynamically create total duration field and give it value of sum durations of all exercises
      
      const total = await db.Workout.aggregate([
        {
          $addFields: {
            totalDuration: {
              $sum: "$exercises.duration",
            },
          },
        },
      ]);

      // Send data to front end
      res.json(total);
    } catch (error) {
      // If error send it back
      res.status(500).end();
    }
  });

  // Create document and send it to front end for displaying it.
  app.post("/api/workouts/", async (req, res) => {
    try {
      const newWorkout = await db.Workout.create({});
      res.json(newWorkout);
    } catch (error) {
      res.status(500).end();
    }
  });

  // Update document, add new exercise
  app.put("/api/workouts/:id", async ({ params, body }, res) => {
    try {
      const addExercise = await db.Workout.findByIdAndUpdate(
        params.id,
        { $push: { exercises: body } },
        { new: true, runValidators: true }
      );
      res.json(addExercise);
    } catch (error) {
      res.status(500).end();
    }
  });

  // Get all documents to display data in dashboard
  app.get("/api/workouts/range", async (req, res) => {
    try {
      const total = await db.Workout.aggregate([
        {$sort: {day: -1}},
        {$limit: 7},
        {
          $addFields: {
            totalDuration: {
              $sum: "$exercises.duration",
            },
          },
        },
      ]);
      res.json(total.reverse());
    } catch (error) {
      res.status(500).end();
    }
  });
};
