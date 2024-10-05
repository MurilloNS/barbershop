const mongoose = require("mongoose");
const { Schema } = mongoose;

const WorkHourSchema = new Schema({
  day: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
});

const BarberSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    workSchedule: {
      type: [WorkHourSchema],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Barber = mongoose.model("Barber", BarberSchema);

module.exports = Barber;
