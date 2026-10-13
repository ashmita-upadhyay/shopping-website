import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { ADMIN_EMAIL } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    // Merged: Trim and lowercase checking with `{ replace: true }` navigation
    const loggedInEmail = data.user?.email?.trim().toLowerCase();

    if (loggedInEmail === ADMIN_EMAIL.trim().toLowerCase()) {
      navigate("/admin", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f8f6f2] flex items-center justify-center px-6 py-14">
      <div className="w-full max-w-md bg-white border border-stone-200 shadow-sm p-8 sm:p-12">
        <p className="text-xs tracking-[0.25em] uppercase text-stone-500">
          Welcome back
        </p>
        <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 mt-3">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-6 mt-8">
          <div>
            <label className="block text-xs tracking-wider uppercase text-stone-600 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-stone-300 bg-transparent px-4 py-3.5 text-sm outline-none transition focus:border-stone-900"
            />
          </div>

          <div>
            <label className="block text-xs tracking-wider uppercase text-stone-600 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-stone-300 bg-transparent px-4 py-3.5 text-sm outline-none transition focus:border-stone-900"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-stone-900 text-white py-4 text-xs tracking-[0.2em] uppercase hover:bg-stone-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-stone-500 mt-8">
          New here?{" "}
          <Link to="/register" className="text-stone-900 font-medium hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}