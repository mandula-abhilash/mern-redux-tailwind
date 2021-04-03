import mongoose from "mongoose";

const Schema = mongoose.Schema;

const councilJobsSchema = new Schema(
  {
    council: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Council",
    },
    createdDate: { type: String },
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

const CouncilJob = mongoose.model("CouncilJob", councilJobsSchema);

export default CouncilJob;
