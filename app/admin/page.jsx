import Dashboard from "./Dashboard";
import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import connectDB from "@/lib/connectDB";
import Project from "@/app/models/Project";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const auth = await verifyAuth();
  if (!auth) {
    redirect("/admin/login");
  }

  // Fetch initial projects server-side for speed
  await connectDB();
  const rawProjects = await Project.find({}).sort({ createdAt: -1 }).lean();

  // Convert MongoDB ObjectIds and dates to strings so they are safe to pass to Client Component
  const initialProjects = rawProjects.map((p) => ({
    _id: p._id.toString(),
    title: p.title,
    image: p.image,
    github: p.github,
    site: p.site,
    createdAt: p.createdAt ? p.createdAt.toISOString() : null,
    updatedAt: p.updatedAt ? p.updatedAt.toISOString() : null,
  }));

  // Construct safe user object
  const user = {
    name: auth.name || "Admin",
    email: auth.email,
  };

  return <Dashboard initialProjects={initialProjects} user={user} />;
}
