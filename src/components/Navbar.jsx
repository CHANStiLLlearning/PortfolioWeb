import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  // បង្កើត State សម្រាប់បើក/បិទ Menu នៅលើទូរស័ព្ទ (Mobile Menu)
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#030712]/70 text-slate-100 sticky top-0 z-50 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* LOGO DESIGN */}
        <Link
          to="/"
          className="text-xl font-black tracking-wider group flex items-center gap-1.5"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-300 group-hover:from-cyan-400 group-hover:to-blue-400 transition-all duration-300">
            MyPortfolio
          </span>
        </Link>

        {/* 💻 DESKTOP MENU LINKS (បង្ហាញតែលើកុំព្យូទ័រ) */}
        <div className="hidden md:flex items-center space-x-7">
          <a
            href="#about"
            className="text-xs font-mono tracking-wide text-slate-400 hover:text-cyan-400 transition-colors duration-300"
          >
            // About
          </a>

          {/* 💼 Experience Link */}
          <a
            href="#experience"
            className="text-xs font-mono tracking-wide text-slate-400 hover:text-cyan-400 transition-colors duration-300"
          >
            // Experience
          </a>

          {/* ⚡ Skills Link */}
          <a
            href="#skills"
            className="text-xs font-mono tracking-wide text-slate-400 hover:text-cyan-400 transition-colors duration-300"
          >
            // Skills
          </a>

          {/* 🚀 Projects Link */}
          <a
            href="#projects"
            className="text-xs font-mono tracking-wide text-slate-400 hover:text-cyan-400 transition-colors duration-300"
          >
            // Projects
          </a>

          <span className="h-4 w-[1px] bg-slate-800"></span>

          <Link
            to="/admin/login"
            className="relative inline-flex items-center justify-center px-4 py-2 text-xs font-mono tracking-widest text-cyan-400 uppercase border border-cyan-500/30 rounded-lg overflow-hidden group transition-all duration-300 hover:border-cyan-400 hover:text-slate-950 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
          >
            <span className="absolute inset-0 w-full h-full bg-cyan-400 scale-x-0 group-hover:scale-x-100 group-hover:duration-300 origin-left transition-transform ease-out -z-10"></span>
            Admin Login
          </Link>
        </div>

        {/* 📱 MOBILE HAMBURGER BUTTON (ប៊ូតុងម៉ឺនុយសម្រាប់ទូរស័ព្ទ) */}
        <div className="flex md:hidden items-center gap-4">
          {/* <Link
            to="/admin/login"
            className="px-3 py-1.5 text-[11px] font-mono text-cyan-400 border border-cyan-500/30 rounded-md"
          >
            Login
          </Link> */}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-400 hover:text-white focus:outline-none p-1"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 📱 MOBILE DROPDOWN MENU (បង្ហាញពេលចុចលើទូរស័ព្ទ) */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out border-b border-slate-800 bg-[#030712]/95 backdrop-blur-lg ${isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
          <a
            href="#about"
            onClick={() => setIsOpen(false)}
            className="text-sm font-mono py-2 text-slate-400 hover:text-cyan-400 transition"
          >
            &gt; About
          </a>

          {/* 💼 Experience (Mobile) */}
          <a
            href="#experience"
            onClick={() => setIsOpen(false)}
            className="text-sm font-mono py-2 text-slate-400 hover:text-cyan-400 transition"
          >
            &gt; Experience
          </a>

          {/* ⚡ Skills (Mobile) */}
          <a
            href="#skills"
            onClick={() => setIsOpen(false)}
            className="text-sm font-mono py-2 text-slate-400 hover:text-cyan-400 transition"
          >
            &gt; Skills
          </a>

          {/* 🚀 Projects (Mobile) */}
          <a
            href="#projects"
            onClick={() => setIsOpen(false)}
            className="text-sm font-mono py-2 text-slate-400 hover:text-cyan-400 transition"
          >
            &gt; Projects
          </a>
        </div>
      </div>
    </nav>
  );
}
