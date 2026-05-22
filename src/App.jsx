import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Project";

// 1. Import ទំព័រពិតប្រាកដដែលយើងបានបង្កើតចូលមកត្រង់នេះ
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Experience from "./components/Experience";
import Skills from "./components/Skills";

// បង្កើត Component សម្រាប់ទំព័រដើមជាមុនសិន
const HomePage = () => (
  <>
    <Navbar />
    <Hero />
    <Projects />
    <Experience /> {/* 2. ដាក់បង្ហាញនៅត្រង់នេះ */}
    <Skills /> {/* 2. ដាក់បង្ហាញនៅត្រង់នេះ */}
  </>
);

// (២. ចំណុចដែលបានកែ៖ លុប Component បណ្តោះអាសន្ន AdminLogin និង AdminDashboard ចាស់ចោល)

export default function App() {
  return (
    <Router>
      <div className="font-sans antialiased bg-slate-900 min-h-screen text-slate-100">
        <Routes>
          {/* ផ្លូវសម្រាប់ User ទូទៅ */}
          <Route path="/" element={<HomePage />} />

          {/* ផ្លូវសម្រាប់ Admin (ឥឡូវវានឹងហៅទំព័រ UI ពិតប្រាកដមកបង្ហាញ) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}
