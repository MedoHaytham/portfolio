import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Project from "@/app/models/Project";
import { verifyAuth } from "@/lib/auth";
import { resequenceOrders } from "@/lib/orderUtils";

export async function PUT(req, { params }) {
  const auth = await verifyAuth();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await connectDB();
    const { title, image, github, site, order } = await req.json();

    if (!title || !image || !github || !site) {
      return NextResponse.json({ error: "Please fill all fields" }, { status: 400 });
    }

    const existingProject = await Project.findById(id);
    if (!existingProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    let newOrder = existingProject.order;
    if (order !== undefined && order !== null && order !== "") {
      newOrder = Number(order);
    }

    if (newOrder !== existingProject.order) {
      // Shift other projects with order >= newOrder by +1 to make room
      await Project.updateMany(
        { _id: { $ne: id }, order: { $gte: newOrder } },
        { $inc: { order: 1 } }
      );
    }

    existingProject.title = title;
    existingProject.image = image;
    existingProject.github = github;
    existingProject.site = site;
    existingProject.order = newOrder;
    await existingProject.save();

    await resequenceOrders();

    const allProjects = await Project.find({}).sort({ order: 1, createdAt: -1 }).lean();

    return NextResponse.json({ project: existingProject, projects: allProjects });
  } catch (error) {
    console.error("PUT Project Error:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const auth = await verifyAuth();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await connectDB();

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    await resequenceOrders();

    const allProjects = await Project.find({}).sort({ order: 1, createdAt: -1 }).lean();

    return NextResponse.json({ message: "Project deleted successfully", projects: allProjects });
  } catch (error) {
    console.error("DELETE Project Error:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
