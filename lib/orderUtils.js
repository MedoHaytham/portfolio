import Project from "@/app/models/Project";

/**
 * Resequences the order field for all projects so they are strictly sequential: 1, 2, 3, ...
 * Preserves the relative order established by existing `order` values (and `createdAt` as fallback).
 */
export async function resequenceOrders() {
  const projects = await Project.find({}).sort({ order: 1, createdAt: -1 });
  const bulkOps = projects.map((p, idx) => ({
    updateOne: {
      filter: { _id: p._id },
      update: { $set: { order: idx + 1 } },
    },
  }));

  if (bulkOps.length > 0) {
    await Project.bulkWrite(bulkOps);
  }
}
