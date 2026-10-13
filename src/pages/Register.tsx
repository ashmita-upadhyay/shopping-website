
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      if (data.user) {
        alert(
          data.session
            ? "Registration successful! You can now log in."
            : "Registration successful! Please check your email if confirmation is required."
        );

        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f8f6f2] flex items-center justify-center px-6 py-14">
      <div className="w-full max-w-md bg-white border border-stone-200 shadow-sm p-8 sm:p-12">
        <p className="text-xs tracking-[0.25em] uppercase text-stone-500">
          Create your account
        </p>

        <h1 className="text-2xl font-medium text-stone-900 mt-3">
          Register
        </h1>

        <p className="text-sm text-stone-500 mt-2">
          Create an account to get started.
        </p>

        <form onSubmit={handleRegister} className="space-y-6 mt-8">
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
              autoComplete="email"
              className="w-full border border-stone-300 bg-transparent px-4 py-3.5 text-sm outline-none transition focus:border-stone-900"
            />
          </div>

          <div>
            <label className="block text-xs tracking-wider uppercase text-stone-600 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
              className="w-full border border-stone-300 bg-transparent px-4 py-3.5 text-sm outline-none transition focus:border-stone-900"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-stone-900 text-white py-4 text-xs tracking-[0.2em] uppercase hover:bg-stone-700 transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-stone-500 mt-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-stone-900 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}