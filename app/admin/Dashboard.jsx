"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { FiPlus, FiEdit2, FiTrash2, FiLogOut, FiGithub, FiExternalLink, FiUploadCloud, FiX, FiArrowUp, FiArrowDown, FiArrowLeft } from "react-icons/fi";

// Resolve image src safely: full URL, local /assets/ fallback, or empty string
const getImageSrc = (img) => {
  if (!img) return "";
  if (img.startsWith("http") || img.startsWith("/")) return img;
  return `/assets/${img}`;
};

export default function Dashboard({ initialProjects, user }) {
  const [projects, setProjects] = useState(initialProjects);
  const [title, setTitle] = useState("");
  const [github, setGithub] = useState("");
  const [site, setSite] = useState("");
  const [image, setImage] = useState(""); // Stores Cloudinary URL or legacy filename
  const [order, setOrder] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null); // ID of project being edited
  const fileInputRef = useRef(null);
  const router = useRouter();

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setImage(data.url);
        toast.success("Image uploaded successfully");
      } else {
        toast.error(data.error || "Failed to upload image");
      }
    } catch (err) {
      console.error(err);
      toast.error("Upload error");
    } finally {
      setUploading(false);
    }
  };

  // Reset form to defaults
  const resetForm = () => {
    setTitle("");
    setGithub("");
    setSite("");
    setImage("");
    setOrder("");
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Handle Form Submit (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !github || !site || !image) {
      toast.error("Please fill in all fields (and upload an image)");
      return;
    }

    setSubmitting(true);
    const payload = { title, image, github, site, order: order !== "" ? Number(order) : undefined };

    try {
      if (editingId) {
        // Update project
        const res = await fetch(`/api/admin/projects/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (res.ok) {
          const updated = projects.map((p) => (p._id === editingId ? data : p));
          updated.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          setProjects(updated);
          toast.success("Project updated successfully");
          resetForm();
        } else {
          toast.error(data.error || "Failed to update project");
        }
      } else {
        // Create project
        const res = await fetch("/api/admin/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (res.ok) {
          const updated = [...projects, data];
          updated.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          setProjects(updated);
          toast.success("Project created successfully");
          resetForm();
        } else {
          toast.error(data.error || "Failed to create project");
        }
      }
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  // Setup form for editing
  const startEdit = (project) => {
    setEditingId(project._id);
    setTitle(project.title);
    setGithub(project.github);
    setSite(project.site);
    setImage(project.image);
    setOrder(project.order !== undefined && project.order !== null ? project.order : "");
    // Scroll to form smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle reordering up/down
  const handleMove = async (index, direction) => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const newProjects = [...projects];
    // Swap elements
    const temp = newProjects[index];
    newProjects[index] = newProjects[targetIndex];
    newProjects[targetIndex] = temp;

    // Assign sequential order values starting from 1
    const reorderedProjects = newProjects.map((p, idx) => ({
      ...p,
      order: idx + 1,
    }));

    setProjects(reorderedProjects);

    try {
      const items = reorderedProjects.map((p) => ({
        _id: p._id,
        order: p.order,
      }));

      const res = await fetch("/api/admin/projects/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      if (res.ok) {
        toast.success("Order updated");
        router.refresh();
      } else {
        toast.error("Failed to save new order");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to reorder");
    }
  };

  // Handle delete project
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (res.ok) {
        setProjects(projects.filter((p) => p._id !== id));
        toast.success("Project deleted successfully");
        if (editingId === id) resetForm();
        router.refresh();
      } else {
        toast.error(data.error || "Failed to delete project");
      }
    } catch (err) {
      console.error(err);
      toast.error("Deletion failed");
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        toast.success("Logged out successfully");
        router.push("/admin/login");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-bgColor bg-[url(/assets/bg-texture.png)] pb-20 text-white">
      {/* Navbar Header */}
      <header className="sticky top-0 z-40 bg-bgColor/80 backdrop-blur-md border-b border-white/10 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-wide">
              Portfolio <span className="text-primary">Admin</span>
            </h1>
            <p className="text-xs text-light">Welcome back, {user?.name || "Admin"}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 py-2.5 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-all duration-300 text-sm font-medium"
            >
              <FiArrowLeft className="text-lg" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 py-2.5 px-4 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all duration-300 text-sm font-medium"
            >
              <FiLogOut />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_57%] gap-10">
          {/* Create/Edit Form Container */}
          <section className="sticky top-28 bg-bgVariant/30 backdrop-blur-lg border border-white/10 p-6 md:p-8 rounded-3xl h-fit shadow-xl transition-all duration-300 hover:border-primary/20 pt-10">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
              <FiPlus className={editingId ? "rotate-45 transition-transform" : ""} />
              {editingId ? "Edit Project" : "Add New Project"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-light mb-2">Project Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. E-Commerce Website"
                  className="w-full px-4 py-3 border border-white/10 rounded-xl bg-bgColor/40 text-white placeholder-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-light mb-2">GitHub Repository URL</label>
                <input
                  type="url"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="https://github.com/username/repo"
                  className="w-full px-4 py-3 border border-white/10 rounded-xl bg-bgColor/40 text-white placeholder-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-light mb-2">Live Site URL</label>
                <input
                  type="url"
                  value={site}
                  onChange={(e) => setSite(e.target.value)}
                  placeholder="https://myproject.com"
                  className="w-full px-4 py-3 border border-white/10 rounded-xl bg-bgColor/40 text-white placeholder-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-light mb-2">Display Order (Optional)</label>
                <input
                  type="number"
                  value={order}
                  min={1}
                  onChange={(e) => setOrder(e.target.value)}
                  placeholder="e.g. 1 (lower numbers appear first)"
                  className="w-full px-4 py-3 border border-white/10 rounded-xl bg-bgColor/40 text-white placeholder-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                />
              </div>

              {/* Cover Image Upload Area */}
              <div>
                <label className="block text-sm font-medium text-light mb-2">Project Cover Image</label>
                <div className="space-y-3">
                  <div className="relative border-2 border-dashed border-white/10 hover:border-primary/40 rounded-2xl p-6 transition-all duration-300 text-center bg-bgColor/30 flex flex-col items-center justify-center cursor-pointer">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      disabled={uploading}
                    />
                    {uploading ? (
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-sm text-light">Uploading image...</p>
                      </div>
                    ) : image ? (
                      <div className="flex flex-col items-center gap-2">
                        <FiUploadCloud className="text-3xl text-green-400" />
                        <p className="text-sm font-medium text-green-400">Change Cover Image</p>
                        <p className="text-xs text-white/50 truncate max-w-50">Uploaded to Cloudinary ✓</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <FiUploadCloud className="text-3xl text-white/40" />
                        <p className="text-sm text-white/60">Click or drag image file here</p>
                        <p className="text-xs text-white/40">PNG, JPG, or SVG</p>
                      </div>
                    )}
                  </div>

                  {/* Live Image Preview */}
                  {image && (
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video w-full group bg-bgColor/40">
                      <Image
                        src={getImageSrc(image)}
                        alt="Project Preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImage("");
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-red-500 transition-all duration-300 z-20"
                      >
                        <FiX />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 btn btn-primary flex items-center justify-center gap-2 py-3.5 rounded-xl text-bgColor font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-bgColor border-t-transparent rounded-full animate-spin"></div>
                  ) : editingId ? (
                    "Update Project"
                  ) : (
                    "Create Project"
                  )}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="py-3 px-6 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-all duration-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* List of projects */}
          <section className="pt-0">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
              Your Projects
              <span className="text-xs font-normal py-1 px-2.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                {projects.length} Total
              </span>
            </h2>

            {projects.length === 0 ? (
              <div className="bg-bgVariant/20 backdrop-blur-lg border border-white/10 p-12 rounded-3xl text-center flex flex-col items-center justify-center text-white/50">
                <p className="text-lg">No projects added yet.</p>
                <p className="text-sm mt-1">Use the form on the left to add your first project.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                  <article
                    key={project._id}
                    className="bg-bgVariant/30 border border-white/5 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 flex flex-col group shadow-lg"
                  >
                    <div className="relative aspect-video bg-bgColor/40 border-b border-white/5 overflow-hidden">
                      <Image
                        src={getImageSrc(project.image)}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-all duration-500"
                      />
                      <span className="absolute top-2 left-2 bg-bgColor/80 backdrop-blur-md border border-white/10 text-primary text-xs font-bold px-2.5 py-1 rounded-lg">
                        #{project.order ?? index + 1}
                      </span>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-3 capitalize line-clamp-1">
                          {project.title}
                        </h3>
                        <div className="flex gap-4 text-sm text-light mb-4">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 hover:text-white transition-all duration-300"
                          >
                            <FiGithub /> Repo
                          </a>
                          <a
                            href={project.site}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 hover:text-white transition-all duration-300"
                          >
                            <FiExternalLink /> Live
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 border-t border-white/5 pt-4 mt-2">
                        {/* Order adjustment buttons */}
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleMove(index, "up")}
                            disabled={index === 0}
                            title="Move Up"
                            className="p-2 rounded-lg border border-white/10 text-sm hover:bg-white/10 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed text-white"
                          >
                            <FiArrowUp />
                          </button>
                          <button
                            onClick={() => handleMove(index, "down")}
                            disabled={index === projects.length - 1}
                            title="Move Down"
                            className="p-2 rounded-lg border border-white/10 text-sm hover:bg-white/10 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed text-white"
                          >
                            <FiArrowDown />
                          </button>
                        </div>
                        <button
                          onClick={() => startEdit(project)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-white/10 text-sm hover:bg-white/5 transition-all duration-300 text-primary"
                        >
                          <FiEdit2 className="text-xs" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(project._id)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-red-500/20 text-sm hover:bg-red-500/10 transition-all duration-300 text-red-400"
                        >
                          <FiTrash2 className="text-xs" /> Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
