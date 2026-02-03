import mongoose, { Schema } from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    subType: { type: String, required: true },
    co2: { type: Number, default: 0 },
    consumption: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    date: {
      type: Date,
      default: () => {
        const d = new Date();
        d.setUTCHours(0, 0, 0, 0);
        return d;
      },
    },
  },
  { timestamps: true },
);

export default mongoose.model("Activity", activitySchema);
