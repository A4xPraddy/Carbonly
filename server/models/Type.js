import mongoose from "mongoose";

const consumptionTypeSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    subTypes: [
      {
        name: { type: String },
        multiplier: { type: Number },
      },
    ],
    unit: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Consumption Type", consumptionTypeSchema);
