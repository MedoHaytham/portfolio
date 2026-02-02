import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema(
  {
    img: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true }
  },
  {timestamps: true}
);

export default mongoose.models.Skill || mongoose.model("Skill", SkillSchema, "Skills")