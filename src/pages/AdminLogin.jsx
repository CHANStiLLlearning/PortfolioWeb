import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      return setError("សូមបំពេញចន្លោះទំនេរឱ្យបានគ្រប់គ្រាន់!");
    }

    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    axios
      .post(`${import.meta.env.VITE_API_URL}/login.php`, formData)
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          // រក្សាទុកស្ថានភាព Login ចូលក្នុង Browser (unified key)
          localStorage.setItem("admin_auth", "true");
          localStorage.setItem("adminUser", res.data.admin.username);
          navigate("/admin/dashboard");
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setError("មានបញ្ហាក្នុងការតភ្ជាប់ទៅកាន់ Server!");
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030712] px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#0b1329]/40 p-8 backdrop-blur-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black tracking-wider text-cyan-400 font-mono font-khmer">
            ADMIN SYSTEM
          </h2>
          <p className="text-sm text-slate-500 mt-1 font-khmer">
            ទំព័រគ្រប់គ្រងប្រព័ន្ធសម្ងាត់
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-1 font-khmer">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-200 focus:border-cyan-500 focus:outline-none transition font-khmer"
              placeholder="បញ្ចូលឈ្មោះគណនី"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-1 font-khmer">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-200 focus:border-cyan-500 focus:outline-none transition font-khmer"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-cyan-500 py-2.5 text-sm font-bold text-slate-900 hover:bg-cyan-600 transition disabled:opacity-50 mt-2 font-khmer"
          >
            {loading ? "ការផ្ទៀងផ្ទាត់..." : "ចូលប្រើប្រាស់ប្រព័ន្ធ"}
          </button>
        </form>
      </div>
    </div>
  );
}
