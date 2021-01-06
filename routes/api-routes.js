const db = require("../models/");

module.exports = function (app) {
  app.get("/api/workouts", async (req, res) => {
    try {
      const total = await db.Workout.aggregate([
        {
          $addFields: {
            totalDuration: {
              $sum: "$exercises.duration",
            },
          },
        },
      ]);

      res.json(total);
    } catch (error) {
      res.status(500).end();
    }
  });

  app.post("/api/workouts/", async (req, res) => {
    try {
      const newWorkout = await db.Workout.create({});
      res.json(newWorkout);
    } catch (error) {
      res.status(500).end();
    }
  });

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

  app.get("/api/workouts/range", async (req, res) => {
    try {
      const total = await db.Workout.aggregate([
        {
          $addFields: {
            totalDuration: {
              $sum: "$exercises.duration",
            },
          },
        },
      ]);
      res.json(total);
    } catch (error) {
      res.status(500).end();
    }
  });
};
