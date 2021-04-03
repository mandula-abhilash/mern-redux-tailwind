import mongoose from "mongoose";

const Schema = mongoose.Schema;

const applicationJobsSchema = new Schema(
  {
    council: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Council",
    },
    createdDate: { type: String },
    applicationURL: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    dateType: { type: String },
    priority: { type: Number },
    status: { type: String },
    scrapedOn: { type: String },
    retries: { type: Number },
  },
  {
    timestamps: true,
  }
);

const ApplicationJob = mongoose.model("ApplicationJob", applicationJobsSchema);

export default ApplicationJob;
