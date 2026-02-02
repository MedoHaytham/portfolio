import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {

  },
  { timestamps: true}
)

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema, "Services")