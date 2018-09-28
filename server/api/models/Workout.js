const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now()
  },
  routine: {
    type: Schema.Types.ObjectId,
    ref: "Routine",
    required: true
  },
  performances: [
    {
      type: Schema.Types.ObjectId,
      ref: "Performance"
    }
  ],
  note: {
    type: String
  }
});

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;
