import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Project from "@/app/models/Project";
import { verifyAuth } from "@/lib/auth";
import { resequenceOrders } from "@/lib/orderUtils";

export async function GET(req) {
  try {
    await connectDB();
    await resequenceOrders();
    const projects = await Project.find({}).sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("GET Projects Error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req) {
  const auth = await verifyAuth();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const { title, image, github, site, order } = await req.json();

    if (!title || !image || !github || !site) {
      return NextResponse.json({ error: "Please fill all fields" }, { status: 400 });
    }

    let projectOrder;
    if (order !== undefined && order !== null && order !== "") {
      projectOrder = Number(order);
      // Shift existing projects with order >= projectOrder by 1
      await Project.updateMany(
        { order: { $gte: projectOrder } },
        { $inc: { order: 1 } }
      );
    } else {
      const count = await Project.countDocuments();
      projectOrder = count + 1;
    }

    const project = await Project.create({
      title,
      image,
      github,
      site,
      order: projectOrder,
    });

    await resequenceOrders();

    const allProjects = await Project.find({}).sort({ order: 1, createdAt: -1 }).lean();

    return NextResponse.json({ project, projects: allProjects }, { status: 201 });
  } catch (error) {
    console.error("POST Project Error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
