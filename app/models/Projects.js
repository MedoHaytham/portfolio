import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },  // ممكن تخزن URL للصورة
    github: { type: String, required: true },
    site: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema, "Projects");
