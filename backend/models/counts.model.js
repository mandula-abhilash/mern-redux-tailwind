import mongoose from "mongoose";

const Schema = mongoose.Schema;

const countsSchema = new Schema(
  {
    council: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Council",
      createdDate: { type: String },
      startDate: { type: String },
      endDate: { type: String },
      pending: { type: Number },
      running: { type: Number },
      completed: { type: Number },
      delayed: { type: Number },
      terminated: { type: Number },
    },
  },
  {
    timestamps: true,
  }
);

const Counts = mongoose.model("Counts", countsSchema);

export default Counts;
