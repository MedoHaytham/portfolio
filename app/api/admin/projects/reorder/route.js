import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Project from "@/app/models/Project";
import { verifyAuth } from "@/lib/auth";
import { resequenceOrders } from "@/lib/orderUtils";

export async function PUT(req) {
  const auth = await verifyAuth();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const { items } = await req.json(); // Array of { _id, order }

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: "Invalid items payload" }, { status: 400 });
    }

    const bulkOps = items.map((item) => ({
      updateOne: {
        filter: { _id: item._id },
        update: { $set: { order: item.order } },
      },
    }));

    if (bulkOps.length > 0) {
      await Project.bulkWrite(bulkOps);
    }

    await resequenceOrders();

    const allProjects = await Project.find({}).sort({ order: 1, createdAt: -1 }).lean();

    return NextResponse.json({ message: "Order updated successfully", projects: allProjects });
  } catch (error) {
    console.error("Reorder Projects Error:", error);
    return NextResponse.json({ error: "Failed to update project order" }, { status: 500 });
  }
}
