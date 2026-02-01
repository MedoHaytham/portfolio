import connectDB from "@/lib/connectDB";
import Project from "@/app/models/Project";

export async function GET() {
  try {
    await connectDB();

    const projects = await Project.find({}).sort({ createdAt: -1 }).lean();

    return Response.json({ projects }, { status: 200 });
  } catch (err) {
    return Response.json(
      { message: "Failed to fetch projects", error: err.message },
      { status: 500 }
    );
  }
}