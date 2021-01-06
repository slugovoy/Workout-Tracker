const db = require("../models/");

module.exports = function (app) {
  app.get("/api/workouts", async (req, res) => {
    try {
      const data = await db.Workout.find({});

      const total = await db.Workout.aggregate([
        {
          $unwind: "$exercises",
        },

        {
          $group: {
            _id: "$_id",
            totalDuration: {
              $sum: "$exercises.duration",
            },
          },
        },
      ]);

      data[data.length - 1].totalDuration = total[0].totalDuration;

      let easyRef = data[data.length - 1]._id;
      let totalTD = total[0].totalDuration;

      const updateTD = await db.Workout.findByIdAndUpdate(easyRef, {
        totalDuration: totalTD,
      });

      res.json(data);
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
      const dataRange = await db.Workout.find({});
      res.json(dataRange);
    } catch (error) {
      res.status(500).end();
    }
  });
};
