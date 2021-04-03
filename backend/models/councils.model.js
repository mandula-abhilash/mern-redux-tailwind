import mongoose from "mongoose";

const councilSchema = mongoose.Schema(
  {
    authorityName: { type: String },
    authorityURL: { type: String },
    authorityType: { type: String },
    dateTypes: [String],
  },
  {
    timestamps: true,
  }
);

const Council = mongoose.model("Council", councilSchema);

export default Council;
