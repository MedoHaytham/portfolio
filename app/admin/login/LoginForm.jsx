"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Please fill in all fields");
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Welcome back!");
        router.push("/admin");
        router.refresh();
      } else {
        const message = data.error || "Invalid email or password";
        setErrorMsg(message);
        toast.error(message);
      }
    } catch (err) {
      console.error(err);
      const message = "An unexpected error occurred. Please try again.";
      setErrorMsg(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bgColor bg-[url(/assets/bg-texture.png)] px-4 py-12">
      <div className="w-full max-w-md bg-bgVariant/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300 hover:border-primary/30">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white tracking-tight capitalize">Admin Login</h2>
          <p className="text-light mt-2 text-sm">Welcome back! Access your project control panel.</p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-500/15 border border-red-500/30 rounded-2xl flex items-center gap-3 text-red-400 text-sm font-medium animate-fadeIn">
            <FiAlertCircle className="text-lg shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-light mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMsg) setErrorMsg("");
              }}
              placeholder="admin@example.com"
              className="w-full px-5 py-3 border border-white/10 rounded-xl bg-bgColor/50 text-white placeholder-white/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-light mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMsg) setErrorMsg("");
                }}
                placeholder="••••••••"
                className="w-full px-5 py-3 pr-12 border border-white/10 rounded-xl bg-bgColor/50 text-white placeholder-white/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors duration-200"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn btn-primary flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-bgColor font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-bgColor border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Login to Dashboard"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
