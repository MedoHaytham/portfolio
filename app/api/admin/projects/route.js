import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Project from "@/app/models/Project";
import { verifyAuth } from "@/lib/auth";

export async function GET(req) {
  try {
    await connectDB();
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

    let projectOrder = order;
    if (projectOrder === undefined || projectOrder === null || projectOrder === "") {
      const count = await Project.countDocuments();
      projectOrder = count + 1;
    } else {
      projectOrder = Number(projectOrder);
    }

    const project = await Project.create({
      title,
      image,
      github,
      site,
      order: projectOrder,
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("POST Project Error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
